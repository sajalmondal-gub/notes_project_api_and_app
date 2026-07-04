import Application from "./core/application";
import bodyParser from "./core/bodyParser";
import Logger from "./middlewares/logger.middleware";
import cors from "./middlewares/cors.middleware";
import apiRouter from "./routes/index";

const app = new Application();
app.use(Logger);
app.use(cors);
app.use(bodyParser);

module.exports = {
  app,
  router: apiRouter,
};
