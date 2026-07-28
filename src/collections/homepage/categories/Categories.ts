import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Technical and Performance Category",
    plural: "Technical and Performance Categories",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    description: "The award categories used across the festival (e.g. Best Film, Best Director). Shown on the homepage, and available to pick from when entering award winners.",
    group: "Homepage",
  },
  access: {
    read: () => true,
    create: async({ req }) => {
      if(!req.user) return false;
      const {totalDocs} = await req.payload.count({collection: "categories"});
      return totalDocs < 20;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Category Name",
      localized: true,
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default Categories;