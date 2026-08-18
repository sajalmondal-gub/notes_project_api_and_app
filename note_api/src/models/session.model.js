class SessionModel{
    constructor(dbRow){
        this.id = dbRow.id;
        this.ipAddress = dbRow.ip_address || "Unknown IP";
        this.location = dbRow.location || "Unknown Location";
        this.deviceInfo = dbRow.device_info || "Unknown Device";
        this.loggedAt = dbRow.logged_at;
        this.expiresAt = dbRow.expires_at;
    }
}

export default SessionModel;