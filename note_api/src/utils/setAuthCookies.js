export const setAuthCookies = (res, accessToken, refreshToken) => {
  res.setHeader(
    "Set-Cookie",
    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=86400; ${config.NODE_ENV === "production" ? "Secure;" : ""} SameSite=Strict`,
  );
  res.appendHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken}; HttpOnly; Path=/api/v1/auth; Max-Age=604800; ${config.NODE_ENV === "production" ? "Secure;" : ""} SameSite=Strict`,
  );
};
