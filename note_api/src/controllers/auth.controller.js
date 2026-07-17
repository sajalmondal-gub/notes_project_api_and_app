import authValidator from "../validators/auth.validator.js";
import authService from "../services/auth.service.js";
import config from "../config/env.js";
import AppError from "../utils/app-error.js";
import { getRequestDetails } from "../utils/request-info.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import { clearAuthCookies } from "../utils/clearAuthCookies.js";

class AuthController {
  // regiseter
  register = async (req, res) => {
    const validatedData = authValidator.validateRegister(req.body);
    const reqDetails = await getRequestDetails(req);

    const { user, accessToken, refreshToken } = await authService.registerUser(
      validatedData,
      reqDetails,
    );

    setAuthCookies(res, accessToken, refreshToken);
    res.sendJSON(201, {
      success: true,
      message: "Registration successful.",
      user,
      accessToken,
      refreshToken,
    });
  };

  login = async (req, res) => {
    const validatedData = authValidator.validateLogin(req.body);
    const reqDetails = await getRequestDetails(req);
    const { user, accessToken, refreshToken } = await authService.loginUser(
      validatedData,
      reqDetails,
    );
    setAuthCookies(res, accessToken, refreshToken);
    res.sendJSON(200, {
      success: true,
      message: "Login successful.",
      user,
      accessToken,
      refreshToken,
    });
  };

  refresh = async (req, res) => {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken && req.headers.cookie) {
      const cookies = {};
      req.headers.cookie.split(";").forEach((cookie) => {
        const parts = cookie.split("=");
        cookies[parts.shift().trim()] = decodeURI(parts.join("="));
      });
      refreshToken = cookies.refreshToken;
    }

    if (!refreshToken) {
      throw new AppError("Refresh token is required.", 401);
    }

    const reqDetails = await getRequestDetails(req);
    const { newAccessToken, newRefreshToken } = await authService.refreshTokens(
      refreshToken,
      reqDetails,
    );

    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.sendJSON(200, {
      success: true,
      message: "Token refreshed successfully.",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
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
    let refreshToken = req.body.refreshToken;
    if (!refreshToken && req.headers.cookie) {
      const cookies = {};
      req.headers.cookie.split(";").forEach((cookie) => {
        const parts = cookie.split("=");
        cookies[parts.shift().trim()] = decodeURI(parts.join("="));
      });
      refreshToken = cookies.refreshToken;
    }
    if (refreshToken) {
      await authService.revokeSession(refreshToken);
    }
    clearAuthCookies(res);
    res.sendJSON(200, { success: true, message: "Logged out successfully." });
  };
}

export default new AuthController();
