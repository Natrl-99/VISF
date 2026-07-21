import type { CollectionConfig } from "payload";

export const ShortFilmsNextEdition: CollectionConfig = {
  slug: "short-films-next-edition",
  labels: {
    singular: "Short Films - Next Edition",
    plural: "Short Films - Next Edition",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "initialDate", "endDate"],
    description: "Next edition announcement shown on the Official Selection Short Films page.",
    group: "Official Selection",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "short-films-next-edition" });
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
        description: "Internal name to identify this edition in the admin, e.g. \"2027 Offdicial Selection Short Films\".",
      },
    },
    {
      name: "initialDate",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd/MMM/yyyy" },
      },
      required: true,
      label: "Initial Date",
    },
    {
      name: "endDate",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd/MMM/yyyy" },
      },
      required: true,
      label: "End Date",
    },
  ],
};

export default ShortFilmsNextEdition;
