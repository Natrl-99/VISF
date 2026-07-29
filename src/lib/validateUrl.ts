import type { Validate } from "payload";

export const validateUrlFormat: Validate<string> = (value) => {
  if (!value) return "This field is required.";

  try {
    new URL(value);
    return true;
  } catch {
    return "Enter a valid URL, e.g. https://example.com";
  }
};
