import config from "../config/env.js";

export default async function errorMiddleware(err, req, res) {
  const statusCode = err.statusCode ?? 500;
  if (statusCode >= 500) {
    console.error(`[SYSTEM ERROR]`, err);
  } else if (config.NODE_ENV === "development") {
    console.warn(
      `⚠️ [Client Error] ${req.method} ${req.path} - Status: ${statusCode} - Message: ${err.message}`,
    );
  }
  
  if (res.writableEnded) return;

  const errorResponse = {
    success: false,
    error: err.name || "InternalServerError",
    message: err.message || "An unexpected system fault occurred",
  };
  if (err.errors && err.errors.length > 0) {
    errorResponse.errors = err.errors;
  }
  res.sendJSON(statusCode, errorResponse);
}
