import Router from "../../core/router.js";
import AuthController from "../../controllers/auth.controller.js";
import rateLimiter from "../../middlewares/rateLimiter.middleware.js";
const authRouter = new Router();

const loginLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes.",
});

const apiLimiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  maxRequests: 60,
  message: "Too many requests. Slow down!",
});

authRouter.post("/register", apiLimiter, AuthController.register);
authRouter.post("/login", loginLimiter, AuthController.login);
authRouter.post(
  "/forgot-password",
  loginLimiter,
  AuthController.forgotPassword,
);
authRouter.post("/reset-password", loginLimiter, AuthController.resetPassword);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
