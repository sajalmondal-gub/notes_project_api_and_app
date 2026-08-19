import Users from "../models/user.model.js";
import db from "../config/database.js";
import {
  FIND_USER_BY_EMAIL,
  INSERT_USER,
  INSERT_USER_PASSWORD,
  INSERT_USER_PROFILE,
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
  async createLocalUser() {
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
        null,
        address,
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

  async linkSocialAccount(userId, provider, providerId) {
    await db.query(INSERT_SOCIAL_IDENTITY, [userId, provider, providerId]);
    return true;
  }
}

export default new UserRepository();
