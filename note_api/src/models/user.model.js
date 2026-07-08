class Users {
  constructor({
    id,
    name,
    email,
    password,
    created_at,
    updated_at,
    reset_password_token,
    reset_password_expires,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.reset_password_expires = reset_password_expires;
    this.reset_password_token = reset_password_token;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}

export default Users;
