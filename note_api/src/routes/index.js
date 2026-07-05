import v1AuthRouter from "./v1/auth.routes.js";

export default async function apiRouter(req, res, next) {
  const originalPath = req.path;
  let handlers = null;

  const versionMatch = req.path.match(/^\/api\/(v[0-9]+)/);

  if (versionMatch) {
    const version = versionMatch[1];
    if (version === "v1") {
      if (req.path.startsWith("/api/v1/auth")) {
        req.path = req.path.replace("/api/v1/auth", "") || "/";
        handlers = v1AuthRouter.match(req);
      }
    }
  }

  // 3. if any sub-router match and find into the array hnadller
  if (handlers && handlers.length > 0) {
    // execute with handeller
    let index = 0;

    const executeHandlers = async () => {
      if (index < handlers.length) {
        const currentHandler = handlers[index++];
        // every middeleware or controller run and next pass
        await currentHandler(req, res, executeHandlers);
      }
    };
    return await executeHandlers();
  }
  req.path = originalPath;
  await next();
}
