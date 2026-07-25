import type { Validate } from "payload";

// Attach to an "endDate" field to reject values before its sibling
// "initialDate" field (e.g. Date Event, Next Edition collections).
export const validateEndDateAfterInitialDate: Validate<
  string,
  unknown,
  { initialDate?: string }
> = (value, { siblingData }) => {
  const initialDate = siblingData?.initialDate;

  if (!value || !initialDate) return true;

  return new Date(value) >= new Date(initialDate)
    ? true
    : "End date must be on or after the initial date.";
};
