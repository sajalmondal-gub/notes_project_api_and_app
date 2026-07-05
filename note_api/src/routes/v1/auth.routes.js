import Router from "../../core/router.js";
import AuthController from "../../controllers/auth.controller.js";

const authRouter = new Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
