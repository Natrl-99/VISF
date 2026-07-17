import type { CollectionConfig } from "payload";
import path from "path";
import os from "os";
import fs from "fs/promises";
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

export const Video: CollectionConfig = {
  slug: "video",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "thumbnail"],
    group: "Home",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: "media/videos",
    mimeTypes: ["video/mp4", "video/webm"],
    adminThumbnail: ({ doc }) => {
      const thumbnail = doc.thumbnail as
        { url?: string } | string | null | undefined;
      return typeof thumbnail === "object" && thumbnail?.url
        ? thumbnail.url
        : null;
    },
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Title" },
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
    afterChange: [
      async ({ doc, previousDoc, req, context }) => {
        if (
          context?.skipThumbnailGeneration ||
          !doc.filename ||
          doc.filename === previousDoc?.filename
        ) {
          return doc;
        }

        const videoPath = path.join(
          process.cwd(),
          "media/videos",
          doc.filename,
        );
        const tmpDir = os.tmpdir();
        const thumbName = `video-${doc.id}-thumb.jpg`;

        try {
          await extractFrame(videoPath, tmpDir, thumbName);
          const thumbPath = path.join(tmpDir, thumbName);
          const buffer = await fs.readFile(thumbPath);

          const mediaDoc = await req.payload.create({
            collection: "media",
            data: { alt: `${doc.title} thumbnail` },
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
        }

        return doc;
      },
    ],
  },
};

export default Video;