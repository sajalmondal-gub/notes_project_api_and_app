import config from "../config/env";

module.expots = async function bodyParse(req, res, next) {
  if (!["PUT", "POST", "PATCH"].includes(req.method)) {
    req.body = {};
    return await next();
  }
  return new Promise((resolve) => {
    let body = "";
    const MAX_SIZE = 2 * 1204 * 1204; //size declear

    req.on("data", (chunk) => {
      body += chunk.toString();
      if (body.length > MAX_SIZE) {
        res.sendJSON(413, {
          error: "Payload Too Large",
          message: "Max body limit is 2MB",
        });
        req.destroy();
        resolve();
      }
    });
    req.on("end", async () => {
      try {
        const contentType = req.headers["content-type"] || "";
        if (contentType.includes("application/json")) {
          req.body = body ? JSON.parse(body) : {};
        } else {
          req.body = body;
        }
        resolve(awaitnext());
      } catch (error) {
        res.sendJSON(400, { error: "Malformed JSON Payload" });
        resolve();
      }
    });
  });
};
