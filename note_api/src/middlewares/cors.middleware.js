import config from "../config/env.js";

export default async function corsMiddleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  await next();
}
