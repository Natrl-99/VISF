import type { ArrayFieldValidation } from "payload";

const MAX_WINNERS_PER_CATEGORY = 2;

type AwardRow = {
  category?: string | number | { id?: string | number } | null;
};

function categoryId(value: AwardRow["category"]): string | number | undefined {
  if (value && typeof value === "object") return value.id;
  return value ?? undefined;
}

// Category ties are allowed (repeat the same category in another row), but
// capped at 2 rows per category — beyond that it stops reading as a tie.
export const validateMaxWinnersPerCategory: ArrayFieldValidation = (value) => {
  const rows = (value ?? []) as AwardRow[];
  const counts = new Map<string | number, number>();

  for (const row of rows) {
    const id = categoryId(row?.category);
    if (id === undefined) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  for (const count of counts.values()) {
    if (count > MAX_WINNERS_PER_CATEGORY) {
      return `Each category can have at most ${MAX_WINNERS_PER_CATEGORY} winners.`;
    }
  }

  return true;
};
