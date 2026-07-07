import Users from "../models/user.model.js";
import db from "../config/database.js";
class UserRepository {
  async findById(id) {
    const sql = `SELECT * FROM users WHERE id = $1 LIMIT 1`;
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) return null;
    return new Users(result.rows[0]);
  }

  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(sql, [email]);
    if (result.rows.length === 0) return null;
    return new Users(result.rows[0]);
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
}

export default new UserRepository();
