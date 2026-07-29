import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";
import { validateMaxWinnersPerCategory } from "@/lib/validateMaxWinnersPerCategory";

export const Winners: CollectionConfig = {
  slug: "winners",
  labels: {
    singular: "Winners Year",
    plural: "Winners - List of Winners",
  },
  admin: {
    useAsTitle: "year",
    defaultColumns: ["year"],
    description:
      "The award winners shown on the website, grouped by festival year. Create one entry per year, then add one row underneath for each award category's winner. Only 4 years can be listed at once — delete an older year before adding a new one.",
    group: "Official Selection",
  },
  access: {
    read: () => true,
    create: async({ req }) => {
      if(!req.user) return false;
      const {totalDocs} = await req.payload.count({collection: "winners"});
      return totalDocs < 4;
    },
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
          "One row per award. Repeat the category for ties or multiple winners in the same category — up to 2 rows per category.",
      },
      validate: validateMaxWinnersPerCategory,
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
          localized: true,
        },
        {
          name: "director",
          type: "text",
          required: true,
          label: "Director",
          localized: true,
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
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default Winners;
