class UsersModel {
  constructor(dbRow) {
    // 1. Core User Data
    this.id = dbRow.id;
    this.email = dbRow.email;
    this.isEmailVerified = dbRow.is_email_verified; 
    this.status = dbRow.status;
    this.role = dbRow.role;
    this.createdAt = dbRow.created_at; 
    this.updatedAt = dbRow.updated_at; 
    this.deletedAt = dbRow.deleted_at;

    // 2. Profile Data (Nested Object) if exist
    if (dbRow.first_name || dbRow.last_name || dbRow.phone_number) {
      this.profile = {
        firstName: dbRow.first_name || null,
        lastName: dbRow.last_name || null,
        fullName: [dbRow.first_name, dbRow.last_name].filter(Boolean).join(" "),
        phoneNumber: dbRow.phone_number || null,
        profileImage: dbRow.profile_image || null,
        address: dbRow.address || null,
      };
    } else {
      this.profile = null;
    }
    // 3. Social Identities Array
    this.identities =
      dbRow.social_identities && dbRow.social_identities.length > 0
        ? dbRow.social_identities
        : [];
  }
}

export default UsersModel;
