import crypto from "crypto";
import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/app-error.js";
import config from "../config/env.js";
import { sendResetMail } from "../utils/mailer.js";
import {
  comparePassword,
  generateTokens,
  hashPassword,
  hashToken,
  verifyRefreshToken,
} from "../utils/security.util.js";
import sessionRepository from "../repositories/session.repository.js";
import tokenRepository from "../repositories/token.repository.js";

class AuthService {
  async registerLocal(data, deviceData) {
    const passwordHash = await hashPassword(data.password);
    const user = await userRepository.createLocalUser({
      email: data.email,
      passwordHash: passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    });
    const session = await sessionRepository.createSession({
      userId: user.id,
      refreshToken: "pending",
      ipAddress: deviceData.ipAddress,
      location: deviceData.location,
      deviceInfo: deviceData.deviceInfo,
      userAgent: deviceData.userAgent,
    });

    const { accessToken, refreshToken } = generateTokens(user, session.id);

    await sessionRepository.updateSession(session.id, refreshToken);

    return { user, accessToken, refreshToken, sessionId: session.id };
  }

  async loginLocal(data, deviceData) {
    const user = await userRepository.findByEmail(data.email);
    if (!user) throw new AppError("Invalid email or password", 401);
    const dbPasswordHash = await userRepository.getHashPassword(user.id);
    if (!dbPasswordHash)
      throw new AppError("Please login using your Social Account", 400);
    const isMatch = await comparePassword(data.password, dbPasswordHash);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    const session = await sessionRepository.createSession({
      userId: user.id,
      refreshToken: "pending",
      ipAddress: deviceData.ipAddress,
      location: deviceData.location,
      deviceInfo: deviceData.deviceInfo,
      userAgent: deviceData.userAgent,
    });

    const { accessToken, refreshToken } = generateTokens(user, session.id);

    await sessionRepository.updateSession(session.id, refreshToken);

    return { user, accessToken, refreshToken, sessionId: session.id };
  }

  async forgotPassword(email, clientType = "web") {
    const user = await userRepository.findByEmail(email);
    if (!user) return true;
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = hashToken(resetToken);
    await tokenRepository.deleteUserTokensByType(user.id, "PASSWORD_RESET");
    await tokenRepository.createToken(
      user.id,
      hashedToken,
      "PASSWORD_RESET",
      15,
    );
    const resetUrl =
      clientType === "app"
        ? `${config.APP_URL}reset-password?token=${resetToken}`
        : `${config.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendResetMail(user.email, resetUrl);
    return true;
  }

  async resetPassword(token, newPassword) {
    const hashedToken = hashToken(token);
    const validToken = await tokenRepository.findValidToken(
      hashedToken,
      "PASSWORD_RESET",
    );
    if (!validToken)
      throw new AppError(
        "Password reset token is invalid or has expired.",
        400,
      );
    const newPasswordHash = await hashPassword(newPassword);

    await userRepository.updatePassword(validToken.userId, newPasswordHash);
    await tokenRepository.deleteTokenById(validToken.id);
    await sessionRepository.revokeAllUserSessions(validToken.userId);
    return true;
  }

  async refreshAccessToken(incomingRefreshToken) {
    const decoded = verifyRefreshToken(incomingRefreshToken);
    const session = await sessionRepository.getSessionById(decoded.sessionId);
    if (
      !session ||
      session.isRevoked ||
      session.refreshToken !== incomingRefreshToken
    ) {
      throw new AppError(
        "Session expired or invalid. Please login again.",
        401,
      );
    }
    const user = await userRepository.findByEmail(decoded.email); // Ba findById
    if (!user) throw new AppError("User not found", 404);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      session.id,
    );
    await sessionRepository.updateSession(session.id, newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  }
}

export default new AuthService();
