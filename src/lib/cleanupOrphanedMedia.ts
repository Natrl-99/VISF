import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  Payload,
  PayloadRequest,
} from "payload";

// Every place a `media` doc can be referenced from, so we can tell whether
// unlinking it in one place actually orphans it, or it's still in use
// somewhere else (e.g. the same image reused in two Gallery slots).
const MEDIA_REFERENCES = [
  { collection: "gallery", where: "photo" },
  { collection: "jury-members", where: "photo" },
  { collection: "sponsors", where: "logo" },
  { collection: "short-films-blocks", where: "movies.poster" },
] as const;

async function isMediaStillReferenced(
  payload: Payload,
  mediaId: string,
): Promise<boolean> {
  const counts = await Promise.all(
    MEDIA_REFERENCES.map(({ collection, where }) =>
      payload.count({
        collection,
        where: { [where]: { equals: mediaId } },
      }),
    ),
  );
  return counts.some((result) => result.totalDocs > 0);
}

// Deletes a `media` doc (and its Cloudinary asset, via the storage adapter's
// handleDelete) only if nothing else references it anymore. Errors are
// logged, not thrown — a failed cleanup shouldn't block the save/delete that
// triggered it, since the orphaned media is a minor cleanup issue, not a
// data-integrity one.
async function deleteMediaIfOrphaned(
  mediaId: string | undefined,
  req: PayloadRequest,
) {
  if (!mediaId) return;

  try {
    const stillReferenced = await isMediaStillReferenced(req.payload, mediaId);
    if (stillReferenced) return;

    await req.payload.delete({ collection: "media", id: mediaId, req });
  } catch (err) {
    req.payload.logger.error(
      `Failed to clean up orphaned media ${mediaId}: ${err}`,
    );
  }
}

const toId = (value: unknown): string | undefined =>
  typeof value === "object" && value !== null
    ? String((value as { id?: unknown }).id ?? "") || undefined
    : typeof value === "string" || typeof value === "number"
      ? String(value)
      : undefined;

// Cleans up the previous media whenever a single upload relation field (e.g.
// Jury's `photo`, Sponsors' `logo`) is swapped to a different image.
export const createMediaCleanupHook =
  (relationField: string): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    const mediaId = toId(doc[relationField]);
    const previousMediaId = toId(previousDoc?.[relationField]);

    if (previousMediaId && previousMediaId !== mediaId) {
      await deleteMediaIfOrphaned(previousMediaId, req);
    }

    return doc;
  };

// Cleans up a single upload relation field's media when the whole document
// that referenced it is deleted (e.g. a Jury member or Sponsor is removed).
export const createMediaCleanupOnDeleteHook =
  (relationField: string): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    await deleteMediaIfOrphaned(toId(doc[relationField]), req);
    return doc;
  };

// Same as createMediaCleanupHook, but for an upload relation nested inside an
// array field (e.g. Short Films' `movies.poster`), where individual rows can
// be added, removed, or swapped independently.
export const createArrayMediaCleanupHook =
  (arrayField: string, relationField: string): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    const rows: Record<string, unknown>[] = Array.isArray(doc[arrayField])
      ? doc[arrayField]
      : [];
    const previousRows: Record<string, unknown>[] = Array.isArray(
      previousDoc?.[arrayField],
    )
      ? previousDoc[arrayField]
      : [];

    const currentMediaIds = new Set(
      rows
        .map((row) => toId(row[relationField]))
        .filter((id): id is string => Boolean(id)),
    );
    const removedMediaIds = new Set(
      previousRows
        .map((row) => toId(row[relationField]))
        .filter(
          (id): id is string =>
            Boolean(id) && !currentMediaIds.has(id as string),
        ),
    );

    for (const mediaId of removedMediaIds) {
      await deleteMediaIfOrphaned(mediaId, req);
    }

    return doc;
  };

// Same as createMediaCleanupOnDeleteHook, but for an upload relation nested
// inside an array field — cleans up every row's media when the whole
// document (e.g. a Gallery or a Short Films block) is deleted.
export const createArrayMediaCleanupOnDeleteHook =
  (arrayField: string, relationField: string): CollectionAfterDeleteHook =>
  async ({ doc, req }) => {
    const rows: Record<string, unknown>[] = Array.isArray(doc[arrayField])
      ? doc[arrayField]
      : [];

    for (const row of rows) {
      await deleteMediaIfOrphaned(toId(row[relationField]), req);
    }

    return doc;
  };
