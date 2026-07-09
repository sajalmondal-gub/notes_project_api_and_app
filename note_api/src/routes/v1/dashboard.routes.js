import DashboardController from "../../controllers/dashboard.controller.js";
import Router from "../../core/router.js";
import rateLimiter from "../../middlewares/rateLimiter.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";

const dashboardRouter = new Router();
const apiLimiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  maxRequests: 60,
  message: "Too many requests. Slow down!",
});

dashboardRouter.get(
  "/",
  apiLimiter,
  protect,
  DashboardController.getDashboardData,
);

export default dashboardRouter;
