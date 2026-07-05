import userService from "../services/user.service.js";
import UserValidator from "../validators/user.validator.js"; //
import { globalErrorHandler } from "../utils/error-handler.js";
class UserController {
  async register(req, res) {
    try {
      const sanitizedData = UserValidator.validateCreate(req.body);
      const newUser = await userService.registerUser(sanitizedData);
      return res
        .writeHead(201, { "Content-Type": "application/json" })
        .end(JSON.stringify({ success: true, data: newUser }));
    } catch (error) {
      return globalErrorHandler(error, res);
    }
  }
}

export default new UserController();
