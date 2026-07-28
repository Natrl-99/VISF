import type { CollectionAfterChangeHook } from "payload";
import { setMediaAssetFolder } from "./cloudinaryStorageAdapter";

// Auto-moves a related `media` doc into a Cloudinary subfolder whenever the
// given upload relation field changes (e.g. Jury's `photo`, Sponsors' `logo`),
// so editors don't have to type the folder name by hand.
export const createMediaFolderHook = (
  relationField: string,
  subfolder: string,
): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    const mediaId =
      typeof doc[relationField] === "object" ? doc[relationField]?.id : doc[relationField];
    const previousMediaId =
      typeof previousDoc?.[relationField] === "object"
        ? previousDoc[relationField]?.id
        : previousDoc?.[relationField];

    if (!mediaId || mediaId === previousMediaId) {
      return doc;
    }

    try {
      const mediaDoc = await req.payload.findByID({ collection: "media", id: mediaId, req });
      if (mediaDoc.prefix !== subfolder) {
        await setMediaAssetFolder(mediaDoc.filename, subfolder);
        await req.payload.update({
          collection: "media",
          id: mediaId,
          data: { prefix: subfolder },
          req,
        });
      }
    } catch (err) {
      req.payload.logger.error(
        `Failed to move ${relationField} media ${mediaId} to the ${subfolder} folder: ${err}`,
      );
    }

    return doc;
  };

// Same as createMediaFolderHook, but for an upload relation nested inside an
// array field (e.g. Short Films' `movies.poster`), where each row needs its
// own folder move.
export const createArrayMediaFolderHook = (
  arrayField: string,
  relationField: string,
  subfolder: string,
): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    const rows: Record<string, unknown>[] = Array.isArray(doc[arrayField]) ? doc[arrayField] : [];
    const previousRows: Record<string, unknown>[] = Array.isArray(previousDoc?.[arrayField])
      ? previousDoc[arrayField]
      : [];
    const previousMediaIds = new Set(
      previousRows.map((row) =>
        typeof row[relationField] === "object"
          ? (row[relationField] as { id?: unknown })?.id
          : row[relationField],
      ),
    );

    for (const row of rows) {
      const mediaId =
        typeof row[relationField] === "object"
          ? (row[relationField] as { id?: string })?.id
          : (row[relationField] as string | undefined);

      if (!mediaId || previousMediaIds.has(mediaId)) {
        continue;
      }

      try {
        const mediaDoc = await req.payload.findByID({ collection: "media", id: mediaId, req });
        if (mediaDoc.prefix !== subfolder) {
          await setMediaAssetFolder(mediaDoc.filename, subfolder);
          await req.payload.update({
            collection: "media",
            id: mediaId,
            data: { prefix: subfolder },
            req,
          });
        }
      } catch (err) {
        req.payload.logger.error(
          `Failed to move ${arrayField}.${relationField} media ${mediaId} to the ${subfolder} folder: ${err}`,
        );
      }
    }

    return doc;
  };
