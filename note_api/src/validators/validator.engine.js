class ValidatorEngine {
  static validate(data, rules) {
    const errors = [];

    for (const field in rules) {
      const fieldRules = rules[field].split("|");
      const value =
        data[field] !== undefined ? String(data[field]).trim() : undefined;

      for (const rule of fieldRules) {
        if (rule === "required") {
          if (!value || value === "") {
            errors.push(
              `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
            );
            break;
          }
        }
        if (value) {
          if (rule.startsWith("min:")) {
            const minLength = parseInt(rule.split(":")[1], 10);
            if (value.length < minLength) {
              errors.push(
                `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters long`,
              );
            }
          }
          if (rule.startsWith("max:")) {
            const maxLength = parseInt(rule.split(":")[1], 10);
            if (value.length > maxLength) {
              errors.push(
                `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed ${maxLength} characters`,
              );
            }
          }
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: ValidatorEngine.sanitize(data, rules),
    };
  }

  static sanitize(data, rules) {
    const sanitizedData = {};
    for (const field in rules) {
      if (data[field] !== undefined) {
        sanitizedData[field] =
          typeof data[field] === "string" ? data[field].trim() : data[field];
      }
    }
    return sanitizedData;
  }
}

export default ValidatorEngine;
