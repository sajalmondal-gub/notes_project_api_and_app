export const INSERT_TOKEN = `INSERT INTO auth_tokens(user_id, token, type, expires_at) VALUES($1,$2,$3,$4) RETURNING *;`;

export const FIND_VALID_TOKEN = `
  SELECT * FROM auth_tokens 
  WHERE token = $1 AND type = $2 AND expires_at > CURRENT_TIMESTAMP 
  LIMIT 1;
`;

export const DELETE_TOKEN_BY_ID = `
  DELETE FROM auth_tokens WHERE id = $1;
`;

export const DELETE_USER_TOKENS_BY_TYPE = `
  DELETE FROM auth_tokens WHERE user_id = $1 AND type = $2;
`;
