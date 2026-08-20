import AppError from "../utils/app-error.js";
import ValidatorEngine from "./validator.engine.js";
class AuthValidator {
  static validateRegister(body) {
    const rules = {
      first_name: "required|min:3|max:30",
      last_name: "required|min:3|max:30",
      email: "required|email|max:150",
      phone: "required|max:14",
      password: "required|min:6|max:100",
      confirm_password: "required",
    };
    const result = ValidatorEngine.validate(body, rules);

    if (!result.isValid) {
      throw new AppError("Validation Failed", 400, result.errors);
    }
    return result.data;
  }

  static validateLogin(body) {
    const rules = {
      email: "required|email",
      password: "required|min:6|max:100",
    };
    const result = ValidatorEngine.validate(body, rules);
    if (!result.isValid) {
      throw new AppError("Validation Failed", 400, result.errors);
    }
    return result.data;
  }

  static validateForgotPassword(body) {
    const rules = {
      email: "required|email",
      client_type: "max:20",
    };
    const result = ValidatorEngine.validate(body, rules);
    if (!result.isValid) {
      throw new AppError("Validation Faild", 400, result.errors);
    }
    return result.data;
  }
  static validateResetPassword(body) {
    const rules = {
      token: "required",
      new_password: "required|min:6|max:100",
      confirm_password: "required",
    };
    const result = ValidatorEngine.validate(body, rules);
    if (!result.isValid) {
      throw new AppError("Validation Faild", 400, result.errors);
    }
    return result.data;
  }
}
export default AuthValidator;
