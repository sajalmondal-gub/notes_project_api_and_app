CREATE TABLE IF NOT EXISTS user_profiles(
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NULL,
    phone_number VARCHAR(50)  UNIQUE,
    profile_image VARCHAR(255) NULL,
    address VARCHAR(255) NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_user_profiles ON user_profiles(user_id);