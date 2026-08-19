import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userRepository from "../repositories/user.repository.js";
import UserModel from "../models/user.model.js";
import AppError from "../utils/app-error.js";
import config from "../config/env.js";
import { sendResetMail } from "../utils/mailer.js";
import { generateTokens, hashPassword } from "../utils/security.util.js";
import sessionRepository from "../repositories/session.repository.js";

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

    const { accessToken, refreshToken } = generateTokens(user);

    const session = await sessionRepository.createSession({
      userId: user.id,
      refreshToken,
      ipAddress: deviceData.ip,
      location: deviceData.location,
      deviceInfo: deviceData.deviceInfo,
      userAgent: deviceData.userAgent,
    });
    return { user, accessToken, refreshToken, sessionId: session.id };
  }
}

export default new AuthService();
