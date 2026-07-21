import type { CollectionConfig } from "payload";

export const Introduction: CollectionConfig = {
  slug: "introduction",
  labels: {
    singular: "Introduction",
    plural: "Introduction",
  },
  admin: {
    useAsTitle: "text",
    defaultColumns: ["text"],
    description: "Introduction text for the festival.",
    group: "Home",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "introduction" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "text",
      type: "textarea",
      required: true,
      label: "Introduction Text",
    },
  ],
};

export default Introduction;
