import type { CollectionConfig } from "payload";
import { createMediaFolderHook } from "@/lib/autoTagMediaFolder";
import { createMediaCleanupHook, createMediaCleanupOnDeleteHook } from "@/lib/cleanupOrphanedMedia";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: {
    singular: "Photo",
    plural: "Gallery Photos",
  },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["photo"],
    description: "The photo gallery shown on the website. You can add up to 12 photos — each photo gets its own entry here.",
    group: "Gallery",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "gallery" });
      return totalDocs < 12;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Photo",
      admin: {
        description: "Recommended: 1600×1200px or larger, landscape ~4:3 or 3:2. Shown both cropped (grid) and uncropped (lightbox), so this ratio works best for both. JPG, PNG, WebP, or HEIC.",
      },
    },
  ],
  hooks: {
    afterChange: [createMediaFolderHook("photo", "gallery"), createMediaCleanupHook("photo")],
    afterDelete: [createMediaCleanupOnDeleteHook("photo")],
  },
};

export default Gallery;
