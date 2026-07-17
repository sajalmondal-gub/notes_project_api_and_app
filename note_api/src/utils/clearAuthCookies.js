
export const clearAuthCookies = (res) => {
  res.setHeader(
    "Set-Cookie",
    "accessToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Strict",
  );
  res.appendHeader(
    "Set-Cookie",
    "refreshToken=; HttpOnly; Path=/api/v1/auth; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; SameSite=Strict",
  );
};
