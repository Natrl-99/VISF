import type { CollectionConfig } from "payload";

export const Winners: CollectionConfig = {
  slug: "winners",
  labels: {
    singular: "Winners Year",
    plural: "List of Winners",
  },
  admin: {
    useAsTitle: "year",
    defaultColumns: ["year"],
    description:
      "Award winners by festival edition. Each entry is one year; add one row per award category, repeating the category for ties or multiple winners.",
    group: "Official Selection",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "year",
      type: "number",
      required: true,
      unique: true,
      label: "Year",
    },
    {
      name: "awards",
      type: "array",
      required: true,
      label: "Award Categories",
      labels: {
        singular: "Award",
        plural: "Awards",
      },
      admin: {
        description:
          "One row per award. Repeat the category for ties or multiple winners in the same category.",
      },
      fields: [
        {
          name: "category",
          type: "relationship",
          relationTo: "categories",
          required: true,
          label: "Category",
          admin: {
            description:
              "Pick an existing category, or use the \"Add new\" option to create one on the fly without leaving this form.",
          },
        },
        {
          name: "movieTitle",
          type: "text",
          required: true,
          label: "Movie Title",
        },
        {
          name: "director",
          type: "text",
          required: true,
          label: "Director",
        },
        {
          name: "country",
          type: "text",
          required: true,
          label: "Country",
          admin: {
            description:
              "For co-productions, separate multiple countries with commas.",
          },
        },
      ],
    },
  ],
};

export default Winners;
