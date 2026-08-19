import config from "../config/env.js";
import AppError from "../utils/app-error.js";

export default async function errorMiddleware(err, req, res, next) {
  // 1. Handle PostgreSQL Unique Violation (Dynamic Duplicate Entry)
  if (err.code === "23505") {
    let customMessage = "A record with this information already exists.";

    // PostgreSQL er err.detail theke exact field name ber kora
    // Example format: Key (phone_number)=(0170000) already exists.
    if (err.detail) {
      const match = err.detail.match(/Key \((.*?)\)=/);
      if (match && match[1]) {
        // field name ta ber kore nilam (e.g., email, phone_number, category_name)
        const fieldName = match[1];

        // underscore (_) thakle seta ke space e convert kore deya jate sundor dekhay
        const cleanFieldName = fieldName.replace(/_/g, " ");

        customMessage = `This ${cleanFieldName} is already in use. Please try another one.`;
      }
    }

    err = new AppError("Duplicate Entry Detected", 400, [customMessage]);
    err.name = "DuplicateEntryError";
  }

  // 2. Default Status & Error Name
  const statusCode = err.statusCode || 500;
  const errorName = err.name || "InternalServerError";

  // 3. Centralized Logging
  if (statusCode >= 500) {
    console.error(
      `💥 [CRITICAL SYSTEM ERROR] ${req.method} ${req.originalUrl || req.url}:`,
      err,
    );
  } else if (config.NODE_ENV === "development") {
    console.warn(
      `⚠️ [Client Error] ${req.method} ${req.url} - Status: ${statusCode} - Message: ${err.message}`,
    );
  }

  if (res.writableEnded) return;

  // 4. Secure Response Format
  const errorResponse = {
    success: false,
    error: errorName,
    // Production e 500 error hole asol fault hide kore dibo
    message:
      statusCode >= 500 && config.NODE_ENV !== "development"
        ? "Internal Server Error. Something went wrong on our end."
        : err.message,
  };

  // 5. Append array of errors if exist
  if (err.errors && err.errors.length > 0) {
    errorResponse.errors = err.errors;
  }

  // 6. Send Response
  res.sendJSON(statusCode, errorResponse);
}
