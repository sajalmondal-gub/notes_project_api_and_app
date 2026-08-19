import Users from "../models/user.model.js";
import db from "../config/database.js";
import { FIND_USER_BY_EMAIL } from "./queries/user.queries.js";
class UserRepository {
  async findByEmail(email) {
    const sql = `SELECT u.id,u.email,u.is_email_verified,u.status,u.role,u.created_at,u.updated_at,u.deleted_at,p.first_name,p.last_name,p.phone_number,p.profile_image,p.address 
    COALESCE(
    json_agg(
    json_build_object('provider', i.provider, 'provider_id', i.provider_id)
    ) FILTER (WHERE i.id IS NOT NULL),'[]'
    )AS social_identities FROM users u LEFT_JOIN

    `;
  }
}

export default new UserRepository();
