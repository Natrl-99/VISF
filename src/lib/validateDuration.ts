import type { Validate } from "payload";

// Minutes: 1-3 digits, unrestricted. Seconds: exactly two digits, 00-59.
const DURATION_PATTERN = /^\d{1,3}:[0-5]\d$/;

// Enforces the "M:SS" format shown in the field's own admin example
// (e.g. "3:05") — catches things like "3:543" or "3:5".
export const validateDurationFormat: Validate<string> = (value) => {
  if (!value) return true;

  return DURATION_PATTERN.test(value)
    ? true
    : 'Duration must be in "M:SS" format (e.g. "3:05").';
};
