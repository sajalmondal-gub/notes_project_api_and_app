import userService from "../services/user.service.js";
import UserValidator from "../validators/user.validator.js"; //

class UserController {
  async create(req, res) {
    const validation = UserValidator.validateCreate(req.body);
    if (!validation.isValid) {
      return res
        .writeHead(400, { "Content-Type": "application/json" })
        .end(JSON.stringify({ success: false, errors: validation.errors }));
    }
    try {
      const newUser = await userService.createNote(
        validation.data,
        req.user.id,
      );
      return res
        .writeHead(201, { "Content-Type": "application/json" })
        .end(JSON.stringify({ success: true, data: newUser }));
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return res
        .writeHead(statusCode, { "Content-Type": "application/json" })
        .end(JSON.stringify({ success: false, message: error.message }));
    }
  }
}

export default new UserController();
