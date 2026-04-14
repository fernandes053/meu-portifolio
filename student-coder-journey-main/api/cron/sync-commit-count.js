import { jsonResponse, syncCommitCount } from "../_lib/commit-count.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return jsonResponse(res, 405, { error: "Method not allowed" });
  }

  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  const vercelCronHeader = req.headers["x-vercel-cron"];
  const isVercelCronCall = typeof vercelCronHeader === "string" && vercelCronHeader.length > 0;
  const isAuthorizedBySecret = cronSecret && authHeader === `Bearer ${cronSecret}`;

  if (!isAuthorizedBySecret && !isVercelCronCall) {
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
}
