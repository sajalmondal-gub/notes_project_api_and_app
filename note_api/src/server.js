import { createServer } from "http";
import config from "./config/env";
import { app, router } from "./app";

const server = createServer((req, res) => {
  app.handle(req, res, router);
});

server.listen(config.PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 [ENTERPRISE RUNTIME] Server running on port ${config.PORT}`);
  console.log(`⚙️  [ENVIRONMENT] Mode: ${config.NODE_ENV.toUpperCase()}`);
  console.log(`======================================================\n`);
});
