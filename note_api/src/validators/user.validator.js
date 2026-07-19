import ValidatorEngine from "./validator.engine.js";
import AppError from "../utils/app-error.js";
class UserValidator {
  static validateCreate(body) {
    const rules = {
      name: "required|min:3|max:30",
      email: "required|max:150",
      password: "required|min:6|max:100",
      confirm_password: "required",
    };
    const result = ValidatorEngine.validate(body, rules);

    if (!result.isValid) {
      throw new AppError("Validation Failed", 400, result.errors);
    }
    return result.data;
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

  static forgotPassword(body) {
    return ValidatorEngine.validate(body, {
      email: "required|email",
    });
  }
}

export default UserValidator;
