// date-event stores "initialDate"/"endDate" as full ISO datetime strings
// (Payload's day-only picker only affects admin UI, not storage). Formats
// them into "D-D MON, YYYY", expanding to show the month and/or year on both
// ends whenever the range crosses one — same fix as formatEditionDateRange,
// applied to this page's different display format (short month, day-first).
export function formatDateEventRange(
  initialIso: string,
  endIso: string,
): string {
  const initial = new Date(initialIso);
  const end = new Date(endIso);

  const initialMonth = initial
    .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
  const endMonth = end
    .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
  const initialDay = initial.getUTCDate();
  const endDay = end.getUTCDate();
  const initialYear = initial.getUTCFullYear();
  const endYear = end.getUTCFullYear();

  if (initialYear !== endYear) {
    return `${initialDay} ${initialMonth}, ${initialYear} - ${endDay} ${endMonth}, ${endYear}`;
  }

  if (initialMonth !== endMonth) {
    return `${initialDay} ${initialMonth} - ${endDay} ${endMonth}, ${endYear}`;
  }

  return `${initialDay}-${endDay} ${endMonth}, ${endYear}`;
}
