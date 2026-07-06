import AppError from "../utils/app-error.js";

// track ip and hit count
const memoryStore = new Map();

const rateLimiter = ({ windowMs, maxRequests, message }) => {
  return async (req, res, next) => {
    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
    const currentTime = Date.now();
    if (!memoryStore.has(ip)) {
      memoryStore.set(ip, {
        count: 1,
        resetTime: currentTime + windowMs,
      });
      return await next();
    }
    const rateData = memoryStore.get(ip);

    if (currentTime > rateData.resetTime) {
      rateData.count = 1;
      rateData.resetTime = currentTime + windowMs;
      return await next();
    }

    rateData.count++;
    const remaining = maxRequests - rateData.count;
    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", remaining < 0 ? 0 : remaining);
    res.setHeader(
      "X-RateLimit-Reset",
      Math.ceil((rateData.resetTime - currentTime) / 1000),
    );
    if (rateData.count > maxRequests) {
      throw new AppError(
        message || "Too many requests, please try again later.",
        429,
      );
    }
    await next();
  };
};
export default rateLimiter;
