import config from "../config/env.js";

export default async function errorMiddleware(err, req, res) {
  console.error(`[SYSTEM ERROR]`, err);

  const statusCode = err.statusCode ?? 500;
  if (res.writableEnded) return;

  res.sendJSON(statusCode, {
    success: false,
    error: err.name || "InternalServerError",
    message: err.message || "An unexpected system fault occurred",
    ...(config.NODE_ENV === "development" && { stack: err.stack }),
  });
}
