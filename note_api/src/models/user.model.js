class Users {
  constructor({ id, name, eamil, password, created_at, updated_at }) {
    this.id = id;
    this.name = name;
    this.eamil = eamil;
    this.password = password;
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
