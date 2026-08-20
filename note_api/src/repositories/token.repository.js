import db from "../config/database.js";
import TokenModel from "../models/token.model.js";
import {
  DELETE_TOKEN_BY_ID,
  DELETE_USER_TOKENS_BY_TYPE,
  FIND_VALID_TOKEN,
  INSERT_TOKEN,
} from "./queries/token.queries.js";
class TokenRepository {
  async createToken(userId, tokenHash, type, expiresInMinutes = 15) {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);
    const result = await db.query(INSERT_TOKEN, [
      userId,
      tokenHash,
      type,
      expiresAt,
    ]);
    return new TokenModel(result.rows[0]);
  }

  async findValidToken(tokenHash, type) {
    const result = await db.query(FIND_VALID_TOKEN, [tokenHash, type]);
    if (result.rows.length === 0) return null;
    return new TokenModel(result.rows[0]);
  }
  async deleteTokenById(tokenId) {
    await db.query(DELETE_TOKEN_BY_ID, [tokenId]);
  }
  async deleteUserTokensByType(userId, type) {
    await db.query(DELETE_USER_TOKENS_BY_TYPE, [userId, type]);
  }
}
export default new TokenRepository();
