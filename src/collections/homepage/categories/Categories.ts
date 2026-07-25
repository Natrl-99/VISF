import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Category",
    plural: "Categories",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "isActive"],
    description: "Category for the festival.",
    group: "Home",
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
    {
      name: "isActive",
      type: "checkbox",
      label: "Is Active",
      defaultValue: true,
      admin: {
        description: "Check this box to make the category active."
      }
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default Categories;