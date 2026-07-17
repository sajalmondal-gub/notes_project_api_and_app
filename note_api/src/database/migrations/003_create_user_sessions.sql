
CREATE TABLE IF NOT EXISTS user_sessions(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    location VARCHAR(255),
    user_agent TEXT,
    is_revoked BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)