import config from "../config/env";

module.expots = async function bodyParse(req, res, next) {
  if (!["PUT", "POST", "PATCH"].includes(req.method)) {
    req.body = {};
    return await next();
  }
};
