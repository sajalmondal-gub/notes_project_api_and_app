import { createServer } from "http";
import config from "./config/env.js";
import { app, router } from "./app.js";

const server = createServer(async (req, res) => {
  try {
    await app.handle(req, res, router);
  } catch (err) {
    console.error("[SERVER ERROR]", err);
    if (!res.writableEnded) {
      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: false,
          error: "InternalServerError",
        })
      );
    }
  }
});

server.on("error", (err) => {
  console.error("[SERVER ERROR]", err);
});

server.listen(config.PORT,'0.0.0.0', () => {
  console.log("==================================================");
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`🌍 Environment: ${config.NODE_ENV}`);
  console.log("==================================================");
});
