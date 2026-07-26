import type { CollectionConfig } from "payload";
import { createMediaFolderHook } from "@/lib/autoTagMediaFolder";
import { createMediaCleanupHook, createMediaCleanupOnDeleteHook } from "@/lib/cleanupOrphanedMedia";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const Jury: CollectionConfig = {
  slug: "jury-members",
  labels: {
    singular: "Jury Member",
    plural: "Jury Members",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "bio", "photo"],
    description: "Jury members for the festival.",
    group: "Home",
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
        description: "800x800px recommended.",
      },
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook(), createMediaFolderHook("photo", "jury"), createMediaCleanupHook("photo")],
    afterDelete: [createMediaCleanupOnDeleteHook("photo")],
  },
};

export default Jury;
