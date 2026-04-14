function jsonResponse(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(payload));
}

async function upstashGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const response = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao ler contador no Upstash.");
  }

  const payload = await response.json();
  return payload.result ?? null;
}

async function upstashSet(key, value) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return false;
  }

  const response = await fetch(`${url}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  if (!response.ok) {
    throw new Error("Falha ao salvar contador no Upstash.");
  }

  return true;
}

async function githubRequest(url, token) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "meu-portifolio-commit-counter",
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Erro GitHub (${response.status}): ${details}`);
  }

  return response.json();
}

async function fetchOwnedRepos(username, token) {
  const repos = [];
  let page = 1;

  while (true) {
    const pageRepos = await githubRequest(
      `https://api.github.com/users/${username}/repos?type=owner&per_page=100&page=${page}`,
      token
    );

    if (!Array.isArray(pageRepos) || pageRepos.length === 0) break;

    repos.push(...pageRepos);
    if (pageRepos.length < 100) break;
    page += 1;
  }

  return repos.filter((repo) => repo?.owner?.login?.toLowerCase() === username.toLowerCase());
}

async function countAuthorCommitsInRepo(username, repoName, token) {
  let total = 0;
  let page = 1;

  while (true) {
    const commits = await githubRequest(
      `https://api.github.com/repos/${username}/${repoName}/commits?author=${encodeURIComponent(
        username
      )}&per_page=100&page=${page}`,
      token
    );

    if (!Array.isArray(commits) || commits.length === 0) break;

    total += commits.length;
    if (commits.length < 100) break;
    page += 1;
  }

  return total;
}

async function fetchGitHubCommitCountFromOwnedRepos(username, token) {
  const repos = await fetchOwnedRepos(username, token);

  let commitCount = 0;
  for (const repo of repos) {
    if (!repo?.name || repo?.fork) continue;
    const repoCommits = await countAuthorCommitsInRepo(username, repo.name, token);
    commitCount += repoCommits;
  }

  return commitCount;
}

async function syncCommitCount() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username || !token) {
    throw new Error("Variáveis GITHUB_USERNAME e/ou GITHUB_TOKEN não configuradas.");
  }

  const commitCount = await fetchGitHubCommitCountFromOwnedRepos(username, token);
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

module.exports = {
  jsonResponse,
  readCachedCommitCount,
  syncCommitCount,
};
