import authValidator from "../validators/auth.validator.js";
import authService from "../services/auth.service.js";
import config from "../config/env.js";
import AppError from "../utils/app-error.js";
import { getRequestDetails } from "../utils/request-info.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";
import { clearAuthCookies } from "../utils/clearAuthCookies.js";

class AuthController {
  // regiseter
  register = async (req, res) => {
    const validatedData = authValidator.validateRegister(req.body);
    const reqDetails = await getRequestDetails(req);

    const result = await authService.registerLocal(
      {
        email: validatedData.email,
        password: validatedData.password,
        firstName: validatedData.first_name,
        lastName: validatedData.last_name,
        phoneNumber: validatedData.phone,
      },
      reqDetails,
    );
    // Optional: Set HTTP-Only cookies for Web support
    //setAuthCookies(res, result.accessToken, result.refreshToken);
    res.sendJSON(201, {
      success: true,
      message: "Registration successful.",
      data: result,
    });
  };
}

export default new AuthController();
