import type { CollectionConfig } from "payload";
import { createMediaFolderHook } from "@/lib/autoTagMediaFolder";
import { createMediaCleanupHook, createMediaCleanupOnDeleteHook } from "@/lib/cleanupOrphanedMedia";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const Jury: CollectionConfig = {
  slug: "jury-members",
  labels: {
    singular: "Meet the Jury",
    plural: "Meet the Jury",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "bio", "photo"],
    description: "The jury members shown on the homepage, each with a photo, name, and short bio.",
    group: "Homepage",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
      localized: true,
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
      label: "Biography",
      localized: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Photo",
      admin: {
        description: "Recommended: 800×1067px or larger, portrait ~3:4 (it's cropped to fill the frame, so the exact ratio matters more than for other photos). JPG, PNG, WebP, or HEIC.",
      },
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook(), createMediaFolderHook("photo", "jury"), createMediaCleanupHook("photo")],
    afterDelete: [createMediaCleanupOnDeleteHook("photo")],
  },
};

export default Jury;
