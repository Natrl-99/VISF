// "*-next-edition" collections store "initialDate"/"endDate" as full ISO
// datetime strings (Payload's day-only picker only affects admin UI, not
// storage). Formats them into a compact range, expanding to show the month
// and/or year on both ends whenever the range crosses one — a same-month
// shorthand like "31-4" would be nonsensical across a month/year boundary.
export function formatEditionDateRange(
  initialIso: string,
  endIso: string,
): string {
  const initial = new Date(initialIso);
  const end = new Date(endIso);

  const initialMonth = initial
    .toLocaleString("en-US", { month: "long", timeZone: "UTC" })
    .toUpperCase();
  const endMonth = end
    .toLocaleString("en-US", { month: "long", timeZone: "UTC" })
    .toUpperCase();
  const initialDay = initial.getUTCDate();
  const endDay = end.getUTCDate();
  const initialYear = initial.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (initialYear !== endYear) {
    return `${initialMonth} ${initialDay}, ${initialYear} - ${endMonth} ${endDay}, ${endYear}`;
  }

  if (initialMonth !== endMonth) {
    return `${initialMonth} ${initialDay} - ${endMonth} ${endDay}, ${endYear}`;
  }

  return `${endMonth} ${initialDay}-${endDay}, ${endYear}`;
}
