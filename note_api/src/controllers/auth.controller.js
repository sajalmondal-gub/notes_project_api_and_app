import authValidator from "../validators/auth.validator.js";
import authService from "../services/auth.service.js";
import config from "../config/env.js";

const setAuthCookie = (res, token) => {
  res.setHeader(
    "Set-Cookie",
    `accessToken=${token}; HttpOnly; Path=/; Max-Age=86400; ${config.NODE_ENV === "production" ? "Secure;" : ""} SameSite=Strict`,
  );
};

class AuthController {
  async register(req, res) {
    const validatedData = authValidator.validateRegister(req.body);
    const { user, token } = await authService.registerUser(validatedData);
    setAuthCookie(res, token);
    res.sendJSON(201, {
      success: true,
      message: "Registration successful.",
      user,
      token,
    });
  }
  async login(req, res) {
    const validatedData = authValidator.validateLogin(req.body);
    const { user, token } = await authService.loginUser(validatedData);
    setAuthCookie(res, token);
    res.sendJSON(200, {
      success: true,
      message: "Login successful.",
      user,
      token,
    });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    if (!email)
      res.sendJSON(400, { success: false, message: "Email is required." });
    const resetUrl = await authService.processForgotPassword(email);
    console.log(`✉️ Email Sent: ${resetUrl}`);
    res.sendJSON(200, {
      success: true,
      message: "Password reset link sent to email.",
      ...(config.NODE_ENV === "development" && { dev_token_link: resetUrl }),
    });
  }

  async logout(req, res) {
    res.setHeader(
      "Set-Cookie",
      "accessToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Strict",
    );
    res.sendJSON(200, { success: true, message: "Logged out successfully." });
  }
}

export default AuthController;
