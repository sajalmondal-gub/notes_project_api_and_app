import Request from "./request";
import Response from "./response";
import notFoundMiddleware from "../middlewares/notFound.middleware";
import ErrorHandeler from "../middlewares/error.middleware";
class Application {
  constructor() {
    this.globalMiddlewares = [];
  }
  use(middleware) {
    this.globalMiddlewares.push(middleware);
  }
  // requst handling main pipline

  async handle(req, res, router) {
    // native ojebject boost of node
    req = Request.extend(req);
    res = Response.extend(res);
    // routing matichng
    const routeHandlers = router.match(req);
    // all global and local middeware conatct
    const pipeline = [...this.globalMiddlewares];
    if (routeHandlers) {
      pipeline.push(...routeHandlers);
    } else {
      const notFound = notFoundMiddleware;
      pipeline.push(notFound);
    }

    let index = 0;
    const next = async () => {
      if (index > pipeline.length) {
        return;
      }
      const currentHandler = pipeline[index++];
      try {
        await currentHandler(req, req, next);
      } catch (error) {
        const errorHandler = ErrorHandeler;
        await errorHandler(error, req, res);
      }
    };
    await next();
  }
}
module.exports = Application;
