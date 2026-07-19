import type { CollectionConfig } from "payload";
import { createMediaFolderHook } from "@/lib/autoTagMediaFolder";

export const Jury: CollectionConfig = {
  slug: "jury-members",
  labels: {
    singular: "Jury Member",
    plural: "Jury Members",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["photo", "name", "bio", "isActive"],
    description: 'Jury members for the festival. The order field determines the order of appearance on the site.',
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
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Photo",
      admin: {
        description:
          "800x800px recommended.",
      },
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
      label: "Biography",
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Visible on the site",
      admin: {
        description:
          "If unchecked, the jury member will not be displayed on the site, but will remain in the database.",
      },
    },
  ],
  hooks: {
    afterChange: [createMediaFolderHook("photo", "jury")],
  },
};

export default Jury;
