import type { CollectionConfig } from "payload";

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
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Category Name",
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
};

export default Categories;