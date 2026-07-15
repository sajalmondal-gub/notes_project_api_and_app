import authValidator from "../validators/auth.validator.js";
import authService from "../services/auth.service.js";
import config from "../config/env.js";
import AppError from "../utils/app-error.js";

const setAuthCookie = (res, token) => {
  res.setHeader(
    "Set-Cookie",
    `accessToken=${token}; HttpOnly; Path=/; Max-Age=86400; ${config.NODE_ENV === "production" ? "Secure;" : ""} SameSite=Strict`,
  );
};

class AuthController {
  // regiseter
  register = async (req, res) => {
    const validatedData = authValidator.validateRegister(req.body);
    const { user, token } = await authService.registerUser(validatedData);
    setAuthCookie(res, token);
    res.sendJSON(201, {
      success: true,
      message: "Registration successful.",
      user,
      token,
    });
  };

  login = async (req, res) => {
    const validatedData = authValidator.validateLogin(req.body);
    const { user, token } = await authService.loginUser(validatedData);
    setAuthCookie(res, token);
    res.sendJSON(200, {
      success: true,
      message: "Login successful.",
      user,
      token,
    });
  };

  forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.sendJSON(400, {
        success: false,
        message: "Email is required.",
      });
    }
    const resetUrl = await authService.processForgotPassword(email);
    console.log(`✉️ Email Sent: ${resetUrl}`);
    res.sendJSON(200, {
      success: true,
      message: "Password reset link sent to email.",
    });
  };

  //reset password

  resetPassword = async (req, res) => {
    const { token, password, confirm_password } = req.body;

    if (!token) throw new AppError("Reset token is missing.", 400);

    if (!password || !confirm_password)
      throw new AppError("Both password fields are required.", 400);

    if (password !== confirm_password)
      throw new AppError("Password and Confirm Password do not match.", 400);

    if (password.length < 6)
      throw new AppError("Password must be at least 6 characters long.", 400);

    const result = await authService.resetPassword(token, password);

    res.sendJSON(200, result);
  };

  logout = async (req, res) => {
    res.setHeader(
      "Set-Cookie",
      "accessToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Strict",
    );
    res.sendJSON(200, { success: true, message: "Logged out successfully." });
  };
}

export default new AuthController();
