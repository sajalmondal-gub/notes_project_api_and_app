export const INSERT_SESSION = `
INSERT INTO user_sessions (user_id,refresh_token,ip_address,location,device_info,user_agent,expires_at) values($1, $2, $3, $4, $5,$6, $7)
RETURNING *;
`;
export const FIND_ACTIVE_SESSION = `
  SELECT * FROM user_sessions 
  WHERE refresh_token = $1 AND is_revoked = false AND expires_at > CURRENT_TIMESTAMP 
  LIMIT 1;
`;

export const REVOKE_SINGLE_SESSION = `
  UPDATE user_sessions 
  SET is_revoked = true 
  WHERE user_id = $1 AND refresh_token = $2 AND is_revoked = false;
`;

export const REVOKE_ALL_USER_SESSIONS = `
  UPDATE user_sessions 
  SET is_revoked = true 
  WHERE user_id = $1 AND is_revoked = false;
`;

export const GET_USER_ACTIVE_DEVICES = `
  SELECT id, ip_address, location, device_info, user_agent, logged_at, expires_at 
  FROM user_sessions 
  WHERE user_id = $1 AND is_revoked = false AND expires_at > CURRENT_TIMESTAMP
  ORDER BY logged_at DESC;
`;

export const UPDATE_SESSION_TOKEN_BY_ID = `UPDATE user_sessions SET refresh_token = $1 WHERE id = $2;`;
export const FIND_SESSION_BY_ID = `SELECT * FROM user_sessions WHERE id=$1;`;
