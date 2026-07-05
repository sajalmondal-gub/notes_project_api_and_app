import Application from "./core/application.js";
import bodyParser from "./core/bodyParser.js";
import Logger from "./middlewares/logger.middleware.js";
import cors from "./middlewares/cors.middleware.js";
import apiRouter from "./routes/index.js";

const app = new Application();
app.use(Logger);
app.use(cors);
app.use(bodyParser);

export { app, apiRouter as router };
