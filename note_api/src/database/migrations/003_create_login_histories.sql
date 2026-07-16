
CREATE TABLE IF NOT EXISTS login_histories(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_address VARCHAR(45),
    location VARCHAR(255),
    user_agent TEXT,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)