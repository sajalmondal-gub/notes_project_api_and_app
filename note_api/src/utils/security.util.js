import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/env.js";
// 1. Password Hashing
export const hashPassword = async (password) => await bcrypt.hash(password, 10);

export const comparePassword = async (plain, hashed) =>
  await bcrypt.compare(plain, hashed);

// 2. 6-Digit OTP Generation
export const generateNumericOTP = () => {
  // 100000 theke 999999 er moddhe random number
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 3. Hash Token/OTP for Database
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// 4. Generate JWT
export const generateTokens = (user, sessionId) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role, sessionId: sessionId },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN },
  );
  const refreshToken = jwt.sign(
    { id: user.id, sessionId: sessionId },
    config.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    },
  );
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
