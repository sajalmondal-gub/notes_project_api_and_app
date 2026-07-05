import ValidatorEngine from "./validator.engine.js";

class UserValidator {
  static validateCreate(body) {
    return ValidatorEngine.validate(body, {
      name: "required|min:3|max:30",
      email: "required|email|max:150",
      password: "required|min:6|max:100|confirmed",
      confirm_password: "required",
    });
  }
  static validateUpdate(body) {
    return ValidatorEngine.validate(body, {
      name: "min:3|max:30",
      email: "email|max:150",
      password: "min:6|max:100",
    });
  }
  static validateLogin(body) {
    return ValidatorEngine.validate(body, {
      email: "required|email",
      password: "required",
    });
  }
}

export default UserValidator;
