import Users from "../models/user.model.js";
import db from "../config/database.js";
import {
  FIND_USER_BY_EMAIL,
  GET_PASSWORD_HASH,
  INSERT_USER,
  INSERT_USER_PASSWORD,
  INSERT_USER_PROFILE,
  UPSERT_PASSWORD,
} from "./queries/user.queries.js";
import UsersModel from "../models/user.model.js";
class UserRepository {
  // 1. Get User By Email
  async findByEmail(email) {
    const result = await db.query(FIND_USER_BY_EMAIL, [
      email.toLowerCase().trim(),
    ]);
    if (result.rows.length === 0) return null;

    return new UsersModel(result.rows[0]);
  }
  // 2. Create Local User (Transaction)
  async createLocalUser({
    email,
    passwordHash,
    firstName,
    lastName = null,
    phoneNumber = null,
    profileImage = null,
  }) {
    const client = await db.pool.connect();
    try {
      await client.query("BEGIN");
      // Step A: Insert into users
      const userRes = await client.query(INSERT_USER, [
        email.toLowerCase().trim(),
        false,
      ]);
      const userId = userRes.rows[0].id;
      // Step B: Insert password
      await client.query(INSERT_USER_PASSWORD, [userId, passwordHash]);
      // Step C: Insert profile
      await client.query(INSERT_USER_PROFILE, [
        userId,
        firstName,
        lastName,
        phoneNumber,
        profileImage,
        null,
      ]);
      await client.query("COMMIT");
      return await this.findByEmail(email);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // 3. get haspassword

  async getHashPassword(userId) {
    const result = await db.query(GET_PASSWORD_HASH, [userId]);
    if (result.rows.length === 0) return null;
    return result.rows[0].password;
  }

  async linkSocialAccount(userId, provider, providerId) {
    await db.query(INSERT_SOCIAL_IDENTITY, [userId, provider, providerId]);
    return true;
  }

  async updatePassword(userId, passwordHash) {
    await db.query(UPSERT_PASSWORD, [userId, passwordHash]);
  }
}

export default new UserRepository();
