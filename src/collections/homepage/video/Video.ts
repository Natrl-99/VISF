import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";
import { createMediaCleanupOnDeleteHook } from "@/lib/cleanupOrphanedMedia";
import path from "path";
import os from "os";
import fs from "fs/promises";
import crypto from "crypto";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

if (ffmpegPath) {
  ffmpeg.setFfmpegPath(ffmpegPath);
}

const extractFrame = (
  videoPath: string,
  outputDir: string,
  outputName: string,
) =>
  new Promise<void>((resolve, reject) => {
    ffmpeg(videoPath)
      .on("end", () => resolve())
      .on("error", reject)
      .screenshots({
        timestamps: ["1"],
        filename: outputName,
        folder: outputDir,
      });
  });

const transcodeToH264 = (inputPath: string, outputPath: string) =>
  new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions(["-pix_fmt yuv420p", "-preset veryfast", "-movflags +faststart"])
      .on("end", () => resolve())
      .on("error", reject)
      .save(outputPath);
  });

export const Video: CollectionConfig = {
  slug: "video",
  labels: {
    singular: "Video",
    plural: "Video",
  },
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "thumbnail"],
    description: "The video that plays in the video banner on the homepage. Only one is allowed — to change it, edit this existing entry instead of creating a new one. Recommended: 1920×1080px (Full HD) or larger, landscape 16:9. MP4, WebM, MKV, or MOV (iPhone's native format) — any of these work, no need to convert first.",
    group: "Homepage",
    components: {
      edit: {
        beforeDocumentControls: ["@/app/(payload)/admin/components/VideoUploadNotice#VideoUploadNotice"],
      },
    },
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "video" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    pasteURL: false,
    mimeTypes: ["video/mp4", "video/webm", "video/x-matroska", "video/matroska", "video/quicktime"],
    adminThumbnail: ({ doc }) => {
      const thumbnail = doc.thumbnail as
        { url?: string } | string | null | undefined;
      return typeof thumbnail === "object" && thumbnail?.url
        ? thumbnail.url
        : null;
    },
    bulkUpload: false,
  },
  fields: [
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      admin: {
        readOnly: true,
        description:
          "Auto-extracted from the video file — do not upload manually.",
      },
    },
  ],
  hooks: {
    // Safari refuses to play WebM/MKV and non-H.264 .mov sources at all
    // (NotSupportedError on video.play()), even though Chrome/Windows plays
    // them fine — so every upload is normalized to H.264/AAC MP4 here,
    // before Cloudinary ever receives it, regardless of what mimeTypes
    // below accepts from the picker.
    beforeOperation: [
      async ({ req }) => {
        // afterChange hooks on this collection (DeepL autofill, thumbnail
        // extraction) issue their own nested payload.update() calls that
        // reuse this same `req` — including its already-transcoded req.file
        // from the first pass. Without this flag, a second pass would treat
        // the now-.mp4 file as new input, making input and output paths
        // collide (ffmpeg refuses to edit a file in place).
        const flaggedReq = req as typeof req & { __videoTranscoded?: boolean };
        const file = req.file;
        if (!file?.data || flaggedReq.__videoTranscoded) return;

        const tmpDir = os.tmpdir();
        const id = crypto.randomUUID();
        const inputPath = path.join(
          tmpDir,
          `video-upload-${id}-src${path.extname(file.name)}`,
        );
        const outputPath = path.join(tmpDir, `video-upload-${id}-out.mp4`);

        try {
          await fs.writeFile(inputPath, file.data);
          await transcodeToH264(inputPath, outputPath);
          const transcoded = await fs.readFile(outputPath);

          req.file = {
            ...file,
            data: transcoded,
            mimetype: "video/mp4",
            name: `${path.parse(file.name).name}.mp4`,
            size: transcoded.length,
          };
          flaggedReq.__videoTranscoded = true;
        } finally {
          await fs.unlink(inputPath).catch(() => {});
          await fs.unlink(outputPath).catch(() => {});
        }
      },
    ],
    afterChange: [
      createDeepLAutofillHook(),
      async ({ doc, previousDoc, req, context }) => {
        if (
          context?.skipThumbnailGeneration ||
          !doc.filename ||
          doc.filename === previousDoc?.filename
        ) {
          return doc;
        }

        const uploadedFile = req.file;
        if (!uploadedFile?.data) {
          req.payload.logger.error(
            `No file buffer available to generate thumbnail for video ${doc.id}`,
          );
          return doc;
        }

        const tmpDir = os.tmpdir();
        const videoPath = path.join(
          tmpDir,
          `video-${doc.id}-src${path.extname(doc.filename)}`,
        );
        const thumbName = `video-${doc.id}-thumb.jpg`;

        try {
          await fs.writeFile(videoPath, uploadedFile.data);
          await extractFrame(videoPath, tmpDir, thumbName);
          const thumbPath = path.join(tmpDir, thumbName);
          const buffer = await fs.readFile(thumbPath);

          const mediaDoc = await req.payload.create({
            collection: "media",
            data: { prefix: "thumbnails" },
            file: {
              data: buffer,
              mimetype: "image/jpeg",
              name: thumbName,
              size: buffer.length,
            },
            req,
          });

          await fs.unlink(thumbPath).catch(() => {});

          await req.payload.update({
            collection: "video",
            id: doc.id,
            data: { thumbnail: mediaDoc.id },
            context: { skipThumbnailGeneration: true },
            req,
          });

          const previousThumbnail = previousDoc?.thumbnail as
            | { id?: string }
            | string
            | null
            | undefined;
          const previousThumbnailId =
            typeof previousThumbnail === "object"
              ? previousThumbnail?.id
              : previousThumbnail;

          if (previousThumbnailId) {
            await req.payload.delete({
              collection: "media",
              id: previousThumbnailId,
              req,
            });
          }
        } catch (err) {
          req.payload.logger.error(
            `Failed to generate thumbnail for video ${doc.id}: ${err}`,
          );
        } finally {
          await fs.unlink(videoPath).catch(() => {});
        }

        return doc;
      },
    ],
    afterDelete: [createMediaCleanupOnDeleteHook("thumbnail")],
  },
};

export default Video;