import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userRepository from "../repositories/user.repository.js";
import UserModel from "../models/user.model.js";
import AppError from "../utils/app-error.js";
import config from "../config/env.js";
import { sendResetMail } from "../utils/mailer.js";

class AuthService {
  async createUserSession(userId, reqDetails) {
    const { ipAddress, location, userAgent } = reqDetails;
    const rawRefreshToken = crypto.randomBytes(40).toString("hex");
    const refreshToken = jwt.sign(
      { id: userId, tokenIdentifier: rawRefreshToken },
      config.JWT_REFRESH_SECRET,
      { expiresIn: config.JWT_REFRESH_EXPIRES_IN },
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);
    await userRepository.createUserSession(
      userId,
      rawRefreshToken,
      ipAddress,
      location,
      userAgent,
      expiresAt,
    );
    return refreshToken;
  }

  async registerUser(sanitizedData, reqDetails) {
    const existingUser = await userRepository.findByEmail(sanitizedData.email);
    if (existingUser) {
      throw new AppError("Email is already registered.", 409);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizedData.password, salt);

    const newUserRow = await userRepository.create({
      name: sanitizedData.name,
      email: sanitizedData.email,
      password: hashedPassword,
    });

    const userModel = new UserModel(newUserRow);
    const accessToken = this.generateToken(userModel);
    const refreshToken = await this.createUserSession(userModel.id, reqDetails);
    return { user: userModel.toJSON(), accessToken, refreshToken };
  }

  async loginUser(sanitizedData, reqDetails) {
    const userRow = await userRepository.findByEmail(sanitizedData.email);
    if (!userRow) {
      throw new AppError("Invalid email or password.", 401);
    }
    const isMatch = await bcrypt.compare(
      sanitizedData.password,
      userRow.password,
    );

    if (!isMatch) {
      throw new AppError("Invalid email or password.", 401);
    }
    const userModel = new UserModel(userRow);

    const accessToken = this.generateToken(userModel);

    const refreshToken = await this.createUserSession(userModel.id, reqDetails);

    return { user: userModel.toJSON(), accessToken, refreshToken };
  }

  async refreshTokens(token, reqDetails) {
    try {
      const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET);
      
      const sessionResult = await db.query(
        `SELECT * FROM user_sessions WHERE user_id = $1 AND refresh_token = $2 AND is_revoked = FALSE LIMIT 1`,
        [decoded.id, decoded.tokenIdentifier]
      );
      
      const session = sessionResult.rows[0];
      if (!session || new Date() > new Date(session.expires_at)) {
        throw new AppError("Session expired or invalid refresh token.", 401);
      }

      // ১. পুরাতন টোকেন রিভোক/ডিলিট করে দেওয়া (টোকেন রোটেশন - সিকিউরিটির জন্য সর্বোচ্চ স্ট্যান্ডার্ড)
      await db.query(`UPDATE user_sessions SET is_revoked = TRUE WHERE id = $1`, [session.id]);

      // ২. নতুন অ্যাক্সেস এবং রিফ্রেশ টোকেন পেয়ার জেনারেট করা
      const userRow = await userRepository.findById(decoded.id);
      const userModel = new UserModel(userRow);
      
      const newAccessToken = this.generateAccessToken(userModel);
      const newRefreshToken = await this.createUserSession(userModel.id, reqDetails);

      return { newAccessToken, newRefreshToken };
    } catch (err) {
      throw new AppError("Invalid or expired refresh token.", 401);
    }
  }



  async processForgotPassword(email) {
    const userRow = await userRepository.findByEmail(email);

    if (!userRow) {
      throw new AppError("No account found with this email.", 404);
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const tokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await userRepository.updateResetToken(
      userRow.id,
      hashedResetToken,
      tokenExpiry,
    );
    const resetUrl = `${config.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendResetMail(userRow.email, resetUrl);
    return resetUrl;
  }

  async resetPassword(token, newPassword) {
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const userModel = await userRepository.findByResetToken(hashedResetToken);
    if (!userModel) throw new AppError("Token is invalid or has expired.", 400);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userRepository.updatePassword(userModel.id, hashedPassword);

    return {
      success: true,
      message:
        "Password has been reset successfully. Please log in with your new password.",
    };
  }

  generateToken(userModel) {
    return jwt.sign({ id: userModel.id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN || "1d",
    });
  }
}

export default new AuthService();
