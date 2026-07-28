import type { Validate } from "payload";

// Attach to an "endDate" field to reject values before its sibling
// "initialDate" field (e.g. Date Event, Next Edition collections).
//
// Payload's validate runs against raw form-state values before the field
// is cast to a Date (e.g. on create), so `value`/`initialDate` can arrive
// as ISO strings rather than Date instances — hence the `new Date(...)`
// wrapping instead of calling `.getTime()` directly.
export const validateEndDateAfterInitialDate: Validate<
  Date,
  unknown,
  { initialDate?: Date | string | null }
> = (value, { siblingData }) => {
  const initialDate = siblingData?.initialDate;

  if (!value || !initialDate) return true;

  return new Date(value).getTime() >= new Date(initialDate).getTime()
    ? true
    : "End date must be on or after the initial date.";
};
