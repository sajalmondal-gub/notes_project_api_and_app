CREATE TABLE IF NOT EXISTS user_identities(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_provider_account UNIQUE(provider,provider_id),
    CONSTRAINT unique_user_provider UNIQUE(user_id, provider),
);
CREATE INDEX idx_identities_provider ON user_identities(provider,provider_id);