import config from "../config/env";

export default async function bodyParse(req, res, next) {
  if (!["PUT", "POST", "PATCH"].includes(req.method)) {
    req.body = {};
    return await next();
  }
  return new Promise((resolve) => {
    let body = "";
    const MAX_SIZE = 2 * 1024 * 1024; //size declear
    let received = 0;

    req.on("data", (chunk) => {
      received += chunk.length;
      if (received > MAX_SIZE) {
        res.sendJSON(413, {
          error: "Payload Too Large",
          message: "Max body limit is 2MB",
        });
        req.destroy();
        return resolve();
      }
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const contentType = req.headers["content-type"] || "";
        if (contentType.includes("application/json")) {
          req.body = body ? JSON.parse(body) : {};
        } else {
          req.body = body;
        }
        resolve(await next());
      } catch (error) {
        res.sendJSON(400, { error: "Malformed JSON Payload" });
        resolve();
      }
    });
    req.on("error", () => {
      res.sendJSON(400, {
        error: "Request Stream Error",
      });

      resolve();
    });
  });
}
