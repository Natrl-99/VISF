import type { CollectionConfig } from "payload";

export const OnlineSessionsIntro: CollectionConfig = {
  slug: "online-sessions-intro",
  labels: {
    singular: "Online Sessions - Intro",
    plural: "Online Sessions - Intros",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "isActive"],
    description: "Intro text shown at the top of the Online Sessions Line Up page.",
    group: "Online Sessions - Line Up",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "online-sessions-intro" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      label: "Label",
      admin: {
        description: "Internal name to identify this intro in the admin, e.g. \"2027 Online Sessions\".",
      },
    },
    {
      name: "text",
      type: "textarea",
      required: true,
      label: "Intro Text",
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Visible on the site",
      admin: {
        description:
          "If unchecked, this intro will not be displayed on the site, but will remain in the database.",
      },
    },
  ],
};

export default OnlineSessionsIntro;
