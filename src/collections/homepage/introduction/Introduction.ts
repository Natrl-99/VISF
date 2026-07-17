import type { CollectionConfig } from "payload";

export const Introduction: CollectionConfig = {
  slug: "introduction",
  labels: {
    singular: "Introduction",
    plural: "Introductions",
  },
  admin: {
    useAsTitle: "text",
    defaultColumns: ["text"],
    description: "Introduction text for the festival.",
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
      name: "text",
      type: "textarea",
      required: true,
      label: "Introduction Text",
    },
  ],
};

export default Introduction;
