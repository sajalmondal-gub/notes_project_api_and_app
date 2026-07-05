import jwt from "jsonwebtoken";
import AppError from "../utils/app-error.js";

const parseCookies = (cookieHeader) => {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(";").forEach((cookie) => {
    const parts = cookie.split("=");
    list[parts.shift().trim()] = decodeURI(parts.join("="));
  });
  return list;
};

export const protect = (req, res, next) => {
  try {
    let token;
    
    // ১. Authorization Header check
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } 
    // ২. HTTP-Only Cookie check 
    else {
      const cookies = parseCookies(req.headers.cookie);
      if (cookies.accessToken) token = cookies.accessToken;
    }

    if (!token) {
      throw new AppError("Authentication required. Please log in.", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = { id: decoded.id, role: decoded.role };
    await next(); 
  } catch (error) {
    throw error; 
  }
};
