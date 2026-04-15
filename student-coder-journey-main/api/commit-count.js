import {
  isCommitCacheFresh,
  jsonResponse,
  readCachedCommitCount,
  syncCommitCount,
} from "./_lib/commit-count.js";

function setSuccessCacheHeaders(res) {
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=43200");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return jsonResponse(res, 405, { error: "Method not allowed" });
  }

  try {
    const cached = await readCachedCommitCount();
    if (cached && isCommitCacheFresh(cached)) {
      setSuccessCacheHeaders(res);
      return jsonResponse(res, 200, {
        source: "cache",
        ...cached,
      });
    }

    try {
      const fresh = await syncCommitCount();
      setSuccessCacheHeaders(res);
      return jsonResponse(res, 200, {
        source: "github",
        ...fresh,
      });
    } catch (syncError) {
      if (cached) {
        setSuccessCacheHeaders(res);
        return jsonResponse(res, 200, {
          source: "cache-stale",
          warning:
            "Nao foi possivel sincronizar agora. Exibindo o ultimo valor salvo no cache.",
          ...cached,
        });
      }

      throw syncError;
    }
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    return jsonResponse(res, 500, {
      error: "Nao foi possivel obter o contador de commits.",
      details: error instanceof Error ? error.message : "Erro inesperado.",
    });
  }
}