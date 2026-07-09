import DashboardController from "../../controllers/dashboard.controller";
import Router from "../../core/router";
import rateLimiter from "../../middlewares/rateLimiter.middleware";
import { protect } from "../../middlewares/auth.middleware";

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
