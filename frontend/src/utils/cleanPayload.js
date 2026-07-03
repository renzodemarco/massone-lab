export function cleanPayload(value) {
  if (Array.isArray(value)) {
    const cleanedItems = value
      .map((item) => cleanPayload(item))
      .filter((item) => item !== undefined && item !== null && item !== "");

    return cleanedItems;
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [key, nestedValue]) => {
      const cleanedValue = cleanPayload(nestedValue);

      if (
        cleanedValue === undefined ||
        cleanedValue === null ||
        cleanedValue === ""
      ) {
        return acc;
      }

      if (Array.isArray(cleanedValue) && cleanedValue.length === 0) {
        return acc;
      }

      if (
        cleanedValue &&
        typeof cleanedValue === "object" &&
        !Array.isArray(cleanedValue) &&
        Object.keys(cleanedValue).length === 0
      ) {
        return acc;
      }

      acc[key] = cleanedValue;
      return acc;
    }, {});
  }

  if (typeof value === "string") {
    return value.trim() === "" ? undefined : value;
  }

  return value;
}
