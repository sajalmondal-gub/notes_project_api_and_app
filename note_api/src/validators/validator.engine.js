class ValidatorEngine {
  static validate(data, rules) {
    const errors = [];

    for (const field in rules) {
      const fieldRules = rules[field].split("|");

      const rawValue = data[field];
      const value =
        rawValue !== undefined && rawValue !== null
          ? String(rawValue).trim()
          : undefined;

      for (const rule of fieldRules) {
        const [ruleName, ruleValue] = rule.split(":");

        switch (ruleName) {
          case "required":
            if (value === undefined || value === null || value === "") {
              errors.push({
                field,
                message: `${this.label(field)} is required`,
              });
              break;
            }
            continue;

          case "min":
            if (value !== undefined && value.length < Number(ruleValue)) {
              errors.push({
                field,
                message: `${this.label(field)} must be at least ${ruleValue} characters long`,
              });
              break;
            }
            continue;

          case "max":
            if (value !== undefined && value.length > Number(ruleValue)) {
              errors.push({
                field,
                message: `${this.label(field)} cannot exceed ${ruleValue} characters`,
              });
              break;
            }
            continue;

          case "email":
            if (
              value !== undefined &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ) {
              errors.push({
                field,
                message: `${this.label(field)} must be a valid email address`,
              });
              break;
            }
            continue;

          case "numeric":
            if (value !== undefined && !/^\d+$/.test(value)) {
              errors.push({
                field,
                message: `${this.label(field)} must be numeric`,
              });
              break;
            }
            continue;

          case "boolean":
            if (
              value !== undefined &&
              !["true", "false", "1", "0"].includes(value)
            ) {
              errors.push({
                field,
                message: `${this.label(field)} must be a boolean value`,
              });
              break;
            }
            continue;

          case "confirmed": {
            const confirmValue =
              data[`confirm_${field}`] ?? data[`${field}_confirmation`];

            if (value !== undefined && value !== confirmValue) {
              errors.push({
                field,
                message: `${this.label(field)} confirmation does not match`,
              });
              break;
            }
            continue;
          }

          case "integer":
            if (value !== undefined && !/^-?\d+$/.test(value)) {
              errors.push({
                field,
                message: `${this.label(field)} must be an integer`,
              });
              break;
            }
            continue;
        }

        if (errors.some((error) => error.field === field)) {
          break;
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      data: this.sanitize(data, rules),
    };
  }

  static sanitize(data, rules) {
    const sanitized = {};

    for (const field in rules) {
      if (data[field] !== undefined) {
        sanitized[field] =
          typeof data[field] === "string" ? data[field].trim() : data[field];
      }
    }

    return sanitized;
  }

  static label(field) {
    return field
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

export default ValidatorEngine;
