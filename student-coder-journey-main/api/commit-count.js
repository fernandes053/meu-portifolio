const {
  jsonResponse,
  readCachedCommitCount,
  syncCommitCount,
} = require("./_lib/commit-count");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return jsonResponse(res, 405, { error: "Method not allowed" });
  }

  try {
    const cached = await readCachedCommitCount();
    if (cached) {
      return jsonResponse(res, 200, {
        source: "cache",
        ...cached,
      });
    }

    const fresh = await syncCommitCount();
    return jsonResponse(res, 200, {
      source: "github",
      ...fresh,
    });
  } catch (error) {
    return jsonResponse(res, 500, {
      error: "Não foi possível obter o contador de commits.",
      details: error instanceof Error ? error.message : "Erro inesperado.",
    });
  }
};
