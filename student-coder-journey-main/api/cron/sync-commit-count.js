const { jsonResponse, syncCommitCount } = require("../_lib/commit-count");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return jsonResponse(res, 405, { error: "Method not allowed" });
  }

  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return jsonResponse(res, 401, { error: "Unauthorized" });
  }

  try {
    const payload = await syncCommitCount();
    return jsonResponse(res, 200, {
      ok: true,
      ...payload,
    });
  } catch (error) {
    return jsonResponse(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : "Erro inesperado.",
    });
  }
};
