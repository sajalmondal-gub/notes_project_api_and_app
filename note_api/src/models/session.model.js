class SessionModel {
  constructor(dbRow) {
    this.id = dbRow.id;
    this.ipAddress = dbRow.ip_address || "Unknown IP";
    this.location = dbRow.location || "Unknown Location";
    this.deviceInfo = dbRow.device_info || "Unknown Device";
    this.isRevoked = dbRow.is_revoked;
    this.loggedAt = dbRow.logged_at;
    this.expiresAt = dbRow.expires_at;
    this.refreshToken = dbRow.refresh_token;
  }
}

export default SessionModel;
