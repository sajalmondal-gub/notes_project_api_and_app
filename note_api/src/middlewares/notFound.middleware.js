export default async function notFoundMiddleware(req, res) {
  if (res.writableEnded) return;
  res.sendJSON(404, {
    success: false,
    error: "NotFoundError",
    message: `Cannot ${req.method} ${req.path}`,
  });
}
