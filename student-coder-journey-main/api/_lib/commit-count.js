function jsonResponse(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(payload));
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const DEFAULT_GITHUB_USERNAME = "fernandes053";

function createError(message, statusCode) {
  const error = new Error(message);
  if (Number.isInteger(statusCode)) {
    error.statusCode = statusCode;
  }
  return error;
}

function buildUpstashUrl(path) {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  if (!baseUrl) {
    return null;
  }

  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function upstashGet(key) {
  const url = buildUpstashUrl(`get/${encodeURIComponent(key)}`);
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw createError("Falha ao ler contador no Upstash.", response.status);
  }

  const payload = await response.json();
  return payload.result ?? null;
}

async function upstashSet(key, value) {
  const url = buildUpstashUrl(`set/${encodeURIComponent(key)}`);
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return false;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  if (!response.ok) {
    throw createError("Falha ao salvar contador no Upstash.", response.status);
  }

  return true;
}

function buildGitHubHeaders(token, extraHeaders = {}) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "meu-portifolio-commit-counter",
    ...extraHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function githubRequest(url, token, extraHeaders) {
  const response = await fetch(url, {
    headers: buildGitHubHeaders(token, extraHeaders),
  });

  if (!response.ok) {
    const details = await response.text();
    throw createError(`Erro GitHub (${response.status}): ${details}`, response.status);
  }

  return response.json();
}

async function githubGraphQLRequest(query, variables, token) {
  if (!token) {
    throw new Error("GITHUB_TOKEN ausente para consulta GraphQL.");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: buildGitHubHeaders(token, {
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw createError(`Erro GitHub GraphQL (${response.status}): ${details}`, response.status);
  }

  const payload = await response.json();
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    throw new Error(`Erro GitHub GraphQL: ${payload.errors[0].message}`);
  }

  return payload?.data ?? null;
}

async function fetchUserCreatedAt(username, token) {
  const user = await githubRequest(`https://api.github.com/users/${username}`, token);
  return typeof user?.created_at === "string" ? user.created_at : null;
}

async function fetchGitHubCommitCountFromProfile(username, token) {
  const createdAt = await fetchUserCreatedAt(username, token);
  const from = createdAt ?? "2008-01-01T00:00:00Z";
  const to = new Date().toISOString();

  const query = `
    query ($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
        }
      }
    }
  `;

  const data = await githubGraphQLRequest(query, { username, from, to }, token);
  const total = data?.user?.contributionsCollection?.totalCommitContributions;

  if (!Number.isFinite(total)) {
    throw new Error("Nao foi possivel obter o total de commits pelo perfil.");
  }

  return Number(total);
}

async function fetchOwnedRepos(username, token) {
  const repos = [];
  let page = 1;

  while (true) {
    const pageRepos = await githubRequest(
      `https://api.github.com/users/${username}/repos?type=owner&per_page=100&page=${page}`,
      token
    );

    if (!Array.isArray(pageRepos) || pageRepos.length === 0) {
      break;
    }

    repos.push(...pageRepos);
    if (pageRepos.length < 100) {
      break;
    }
    page += 1;
  }

  return repos.filter((repo) => repo?.owner?.login?.toLowerCase() === username.toLowerCase());
}

async function countAuthorCommitsInRepo(username, repoName, token) {
  let total = 0;
  let page = 1;

  while (true) {
    try {
      const commits = await githubRequest(
        `https://api.github.com/repos/${username}/${repoName}/commits?author=${encodeURIComponent(
          username
        )}&per_page=100&page=${page}`,
        token
      );

      if (!Array.isArray(commits) || commits.length === 0) {
        break;
      }

      total += commits.length;
      if (commits.length < 100) {
        break;
      }

      page += 1;
    } catch (error) {
      if (error?.statusCode === 409) {
        return total;
      }
      throw error;
    }
  }

  return total;
}

async function fetchGitHubCommitCountFromOwnedRepos(username, token) {
  const repos = await fetchOwnedRepos(username, token);

  let commitCount = 0;
  for (const repo of repos) {
    if (!repo?.name || repo?.fork || repo?.archived || repo?.size === 0) {
      continue;
    }

    const repoCommits = await countAuthorCommitsInRepo(username, repo.name, token);
    commitCount += repoCommits;
  }

  return commitCount;
}

async function syncCommitCount() {
  const username = process.env.GITHUB_USERNAME ?? DEFAULT_GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    throw new Error("GITHUB_USERNAME nao configurado.");
  }

  let commitCount;
  if (token) {
    try {
      commitCount = await fetchGitHubCommitCountFromProfile(username, token);
    } catch {
      commitCount = await fetchGitHubCommitCountFromOwnedRepos(username, token);
    }
  } else {
    commitCount = await fetchGitHubCommitCountFromOwnedRepos(username, token);
  }

  const updatedAt = new Date().toISOString();

  const cacheSaved = await upstashSet("portfolio:commit_count", commitCount);
  if (cacheSaved) {
    await upstashSet("portfolio:commit_count_updated_at", updatedAt);
  }

  return { commitCount, updatedAt };
}

async function readCachedCommitCount() {
  const commitCountRaw = await upstashGet("portfolio:commit_count");
  const updatedAt = await upstashGet("portfolio:commit_count_updated_at");
  const commitCount = Number(commitCountRaw);

  if (!Number.isFinite(commitCount)) {
    return null;
  }

  return {
    commitCount,
    updatedAt: typeof updatedAt === "string" ? updatedAt : null,
  };
}

function isCommitCacheFresh(cached) {
  if (!cached || typeof cached.updatedAt !== "string") {
    return false;
  }

  const updatedAtMs = Date.parse(cached.updatedAt);
  if (!Number.isFinite(updatedAtMs)) {
    return false;
  }

  return Date.now() - updatedAtMs < ONE_DAY_IN_MS;
}

export { isCommitCacheFresh, jsonResponse, readCachedCommitCount, syncCommitCount };