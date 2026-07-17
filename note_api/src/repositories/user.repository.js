import Users from "../models/user.model.js";
import db from "../config/database.js";
class UserRepository {
  async findById(id) {
    const sql = `SELECT * FROM users WHERE id = $1 LIMIT 1`;
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(sql, [email]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async create(userData) {
    const sql = `
          INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at `;

    const values = [
      userData.name,
      userData.email.toLowerCase().trim(),
      userData.password,
    ];
    const result = await db.query(sql, values);
    return result.rows[0];
  }

  async createUserSession(
    userId,
    rawRefreshToken,
    ipAddress,
    location,
    userAgent,
    expiresAt,
  ) {
    const sql = `INSERT INTO user_sessions (user_id,refresh_token,ip_address,location,user_agent,expires_at) VALUES ($1, $2, $3, $4, $5, $6)`;
    await db.query(sql, [
      userId,
      rawRefreshToken,
      ipAddress,
      location,
      userAgent,
      expiresAt,
    ]);
    return true;
  }

  async findSession(decoded) {
    const sessionResult = await db.query(
      `SELECT * FROM user_sessions WHERE user_id = $1 AND refresh_token = $2 AND is_revoked = FALSE LIMIT 1`,
      [decoded.id, decoded.tokenIdentifier],
    );
    return sessionResult.rows[0];
  }
  async revokeSessionById(sessionId) {
    await db.query(`UPDATE user_sessions SET is_revoked = TRUE WHERE id = $1`, [
      sessionId,
    ]);
  }

  async revokeSessionByToken(userId, tokenIdentifier) {
    await db.query(
      `UPDATE user_sessions SET is_revoked = TRUE WHERE user_id = $1 AND refresh_token = $2`,
      [userId, tokenIdentifier],
    );
  }

  async updateResetToken(id, hashedToken, expiry) {
    const sql = `UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3`;
    await db.query(sql, [hashedToken, expiry, id]);
  }

  async findByResetToken(hashedToken) {
    const sql = `SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW() LIMIT 1`;
    const result = await db.query(sql, [hashedToken]);
    if (result.rows.length === 0) return null;
    return new Users(result.rows[0]);
  }

  async updatePassword(id, hashedPassword) {
    const sql = `UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2`;
    await db.query(sql, [hashedPassword, id]);
  }
}

export default new UserRepository();
