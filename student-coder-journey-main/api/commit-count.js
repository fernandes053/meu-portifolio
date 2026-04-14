import {
  isCommitCacheFresh,
  jsonResponse,
  readCachedCommitCount,
  syncCommitCount,
} from "./_lib/commit-count.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return jsonResponse(res, 405, { error: "Method not allowed" });
  }

  try {
    const cached = await readCachedCommitCount();
    if (cached && isCommitCacheFresh(cached)) {
      return jsonResponse(res, 200, {
        source: "cache",
        ...cached,
      });
    }

    try {
      const fresh = await syncCommitCount();
      return jsonResponse(res, 200, {
        source: "github",
        ...fresh,
      });
    } catch (syncError) {
      if (cached) {
        return jsonResponse(res, 200, {
          source: "cache-stale",
          warning:
            "Não foi possível sincronizar agora. Exibindo o último valor salvo no cache.",
          ...cached,
        });
      }

      throw syncError;
    }
  } catch (error) {
    return jsonResponse(res, 500, {
      error: "Não foi possível obter o contador de commits.",
      details: error instanceof Error ? error.message : "Erro inesperado.",
    });
  }
}
