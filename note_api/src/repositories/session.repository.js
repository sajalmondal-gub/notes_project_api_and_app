import db from "../config/database.js";
import SessionModel from "../models/session.model.js";
import {
  INSERT_SESSION,
  FIND_ACTIVE_SESSION,
  REVOKE_SINGLE_SESSION,
  REVOKE_ALL_USER_SESSIONS,
  GET_USER_ACTIVE_DEVICES,
  UPDATE_SESSION_TOKEN_BY_ID,
} from "./queries/session.queries.js";
class SessionRepository {
  async createSession({
    userId,
    refreshToken,
    ipAddress = null,
    location = null,
    deviceInfo = null,
    userAgent = null,
    expiresInDays = 30,
  }) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const result = await db.query(INSERT_SESSION, [
      userId,
      refreshToken,
      ipAddress,
      location,
      deviceInfo,
      userAgent,
      expiresAt,
    ]);
    return new SessionModel(result.rows[0]);
  }

  async findActiveSession(refreshToken) {
    const result = await db.query(FIND_ACTIVE_SESSION, [refreshToken]);
    if (result.rows.length === 0) return null;
    return new SessionModel(result.rows[0]);
  }
  async revokeSession(userId, refreshToken) {
    const result = await db.query(REVOKE_SINGLE_SESSION, [
      userId,
      refreshToken,
    ]);
    return result.rowCount > 0;
  }

  async revokeAllUserSessions(userId) {
    const result = await db.query(REVOKE_ALL_USER_SESSIONS, [userId]);
    return result.rowCount;
  }

  async getActiveDevices(userId) {
    const result = await db.query(GET_USER_ACTIVE_DEVICES, [userId]);
    return result.rows.map((row) => new SessionModel(row));
  }

  async updateSession(sessionId, refreshToken) {
    await db.query(UPDATE_SESSION_TOKEN_BY_ID, [refreshToken, sessionId]);
  }
  async getSessionById(sessionId) {
    const result = await db.query(FIND_SESSION_BY_ID, [sessionId]);
    return new SessionModel(result.rows[0]);
  }
}
export default new SessionRepository();
