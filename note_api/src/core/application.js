import Request from "./request.js";
import Response from "./response.js";
import notFoundMiddleware from "../middlewares/notFound.middleware.js";
import ErrorHandeler from "../middlewares/error.middleware.js";

class Application {
  constructor() {
    this.globalMiddlewares = [];
  }

  use(middleware) {
    this.globalMiddlewares.push(middleware);
  }

  // request handling main pipeline
  async handle(req, res, router) {
    // native object boost of node
    req = Request.extend(req);
    res = Response.extend(res);
    const pipeline = [...this.globalMiddlewares];

    // ২. রাউটার যদি একটি ফাংশন হয় (যেমন আমাদের dynamic apiRouter)
    if (typeof router === "function") {
      pipeline.push(router);
    } 

    else if (router && typeof router.match === "function") {
      const routeHandlers = router.match(req);
      if (routeHandlers) {
        pipeline.push(...routeHandlers);
      } else {
        pipeline.push(notFoundMiddleware);
      }
    } 
    else {
      pipeline.push(notFoundMiddleware);
    }

    let index = 0;
    
    const next = async () => {
      if (res.writableEnded) return;
      if (index >= pipeline.length) return;
      
      const currentHandler = pipeline[index++];
      try {
        await currentHandler(req, res, next);
      } catch (error) {
        const errorHandler = ErrorHandeler;
        await errorHandler(error, req, res);
      }
    };

    await next();
  }
}

export default Application;