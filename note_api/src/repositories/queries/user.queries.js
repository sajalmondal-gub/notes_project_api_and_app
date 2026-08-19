const SELECT_USER_COLUMNS = `u.id, u.email, u.is_email_verified, u.status, u.role, u.created_at, u.updated_at, u.deleted_at,p.first_name, p.last_name, p.phone_number, p.profile_image, p.address`;
const SOCIAL_IDENTITIES_AGG = `
  COALESCE(
    json_agg(
      json_build_object('provider', i.provider, 'provider_id', i.provider_id)
    ) FILTER (WHERE i.id IS NOT NULL), '[]'
  ) AS social_identities
`;

const BASE_USER_JOINS = `
FROM users u
LEFT JOIN user_profiles p ON u.id =p.user_id
LEFT JOIN user_identities i ON u.id=i.user_id
`;
const BASE_USER_GROUP_BY = `
GROUP BY u.id, p.first_name, p.last_name, p.phone_number, p.profile_image, p.address
`;

// ==========================================
//  EXPORTED QUERIES (Using Fragments)
//

// 1. Find by Email (Using snippets)
export const FIND_USER_BY_EMAIL = `
SELECT ${SELECT_USER_COLUMNS}, ${SOCIAL_IDENTITIES_AGG} ${BASE_USER_JOINS}
WHERE u.email=$1 AND u.deleted_at IS NULL 
${BASE_USER_GROUP_BY} LIMIT 1;
`;
// 3. Get All Users (Admin Panel, same fragments!)

export const GET_ALL_USERS_PAGINATED = `
SELECT ${SELECT_USER_COLUMNS}, ${SOCIAL_IDENTITIES_AGG} ${BASE_USER_JOINS}
WHERE u.email=$1 AND u.deleted_at IS NULL
ORDER BY u.created_at DESC
${BASE_USER_GROUP_BY} LIMIT $1 OFFSET $2
`;

// ==========================================
// WRITE / UPDATE QUERIES
// ==========================================

export const INSERT_USER = `
INSERT INTO users(email,is_email_verified) VALUES($1,$2) RETURNING id;
`;

export const INSERT_USER_PASSWORD = `
  INSERT INTO user_passwords (user_id, password) 
  VALUES ($1, $2);
`;

export const INSERT_USER_PROFILE = `
  INSERT INTO user_profiles (user_id, first_name, last_name, phone_number, profile_image,address) 
  VALUES ($1, $2, $3, $4, $5,$6);
`;

export const INSERT_SOCIAL_IDENTITY = `
  INSERT INTO user_identities (user_id, provider, provider_id) 
  VALUES ($1, $2, $3)
  ON CONFLICT (provider, provider_id) DO NOTHING;
`;

export const GET_PASSWORD_HASH = `
  SELECT password FROM user_passwords WHERE user_id = $1 LIMIT 1;
`;

export const UPSERT_PASSWORD = `
  INSERT INTO user_passwords (user_id, password) 
  VALUES ($1, $2)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    password = EXCLUDED.password, 
    last_changed_at = CURRENT_TIMESTAMP;
`;
