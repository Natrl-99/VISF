import type { CollectionConfig } from "payload";
import { createArrayMediaFolderHook } from "@/lib/autoTagMediaFolder";
import {
  createArrayMediaCleanupHook,
  createArrayMediaCleanupOnDeleteHook,
} from "@/lib/cleanupOrphanedMedia";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: {
    singular: "Gallery",
    plural: "Gallery",
  },
  admin: {
    useAsTitle: "id",
    description: "Festival photo gallery. Only one gallery exists; up to 12 photos.",
    group: "Gallery",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "gallery" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "photos",
      type: "array",
      required: true,
      maxRows: 12,
      label: "Photos",
      labels: {
        singular: "Photo",
        plural: "Photos",
      },
      admin: {
        description: "Up to 12 photos. Each can be added, edited, or removed individually.",
      },
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Photo",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      createArrayMediaFolderHook("photos", "photo", "gallery"),
      createArrayMediaCleanupHook("photos", "photo"),
    ],
    afterDelete: [createArrayMediaCleanupOnDeleteHook("photos", "photo")],
  },
};

export default Gallery;
