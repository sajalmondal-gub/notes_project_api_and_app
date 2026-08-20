class TokenModel {
  constructor(dbRow) {
    this.id = dbRow.id;
    this.userId = dbRow.user_id;
    this.token = dbRow.token;
    this.type = dbRow.type;
    this.expiresAt = dbRow.expires_at;
    this.createdAt = dbRow.created_at;
  }
}

export default TokenModel;
