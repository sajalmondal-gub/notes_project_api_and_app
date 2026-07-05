import AppError from "./app-error.js";

export const globalErrorHandler = (error, res) => {
  // 1. if custom error
  if (error instanceof AppError) {
    return res
      .writeHead(error.statusCode, { "Content-Type": "application/json" })
      .end(
        JSON.stringify({
          success: false,
          message: error.message,
          errors: error.errors,
        }),
      );
  }

  //  2. PostgreSQL Unique Violation (Error Code: 23505)
  if (error.code === "23505") {
    return res.writeHead(400, { "Content-Type": "application/json" }).end(
      JSON.stringify({
        success: false,
        message: "Duplicate Entry Detected",
        errors: [
          "This email is already registered. Please login or use another email.",
        ],
      }),
    );
  }

  // 3. unknown error or network eroor (eg: network error)
  console.error("💥 [CRITICAL SYSTEM ERROR]:", error);
  return res.writeHead(500, { "Content-Type": "application/json" }).end(
    JSON.stringify({
      success: false,
      message: "Internal Server Error. Something went wrong on our end.",
    }),
  );
};
