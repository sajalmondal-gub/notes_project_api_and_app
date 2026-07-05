import Application from "./core/application.js";
import bodyParser from "./core/bodyParser.js";
import Logger from "./middlewares/logger.middleware.js";
import cors from "./middlewares/cors.middleware.js";
import apiRouter from "./routes/index.js";
import notFoundMiddleware from "./middlewares/notfound.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = new Application();
app.use(Logger);
app.use(cors);
app.use(bodyParser);
app.use(apiRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app, apiRouter as router };
