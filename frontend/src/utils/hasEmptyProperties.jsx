//checks empty property
export function hasEmptyProperties(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // Check for empty strings, null, or undefined
      if (value === "" || value === null || value === undefined) {
        return true;
      }

      // Optionally check for nested objects
      if (typeof value === "object" && !Array.isArray(value)) {
        if (hasEmptyProperties(value)) return true;
      }
    }
  }
  return false;
}
