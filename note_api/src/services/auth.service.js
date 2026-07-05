import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userRepository from "../repositories/user.repository.js";
import UserModel from "../models/user.model.js";
import AppError from "../utils/app-error.js";
import config from "../config/env.js";

class AuthService {
  async registerUser(sanitizedData) {
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
    const token = this.generateToken(userModel);
    return { user: userModel.toJSON(), token };
  }

  async loginUser(sanitizedData) {
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
    
    const token = this.generateToken(userModel);

    return { user: userModel.toJSON(), token };
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
    return resetUrl;
  }

  generateToken(userModel) {
    return jwt.sign(
      { id: userModel.id, role: userModel.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN || "1d" },
    );
  }
}

export default new AuthService();