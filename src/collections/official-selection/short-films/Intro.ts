import type { CollectionConfig } from "payload";

export const ShortFilmsIntro: CollectionConfig = {
  slug: "short-films-intro",
  labels: {
    singular: "Short Films - Introduction",
    plural: "Short Films - Introduction",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label"],
    description: "Intro text shown at the top of the Official Selection Short Films page.",
    group: "Official Selection",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "short-films-intro" });
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
  ],
};

export default ShortFilmsIntro;
