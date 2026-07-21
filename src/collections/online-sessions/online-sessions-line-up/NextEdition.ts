import type { CollectionConfig } from "payload";

export const NextEdition: CollectionConfig = {
  slug: "online-sessions-next-edition",
  labels: {
    singular: "Online Sessions - Next Edition",
    plural: "Online Sessions - Next Editions",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "initialDate", "endDate", "isActive"],
    description: "Next edition announcement shown on the Online Sessions Line Up page.",
    group: "Online Sessions - Line Up",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "online-sessions-next-edition" });
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
        description: "Internal name to identify this edition in the admin, e.g. \"2027 Online Sessions\".",
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
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Visible on the site",
      admin: {
        description:
          "If unchecked, this edition will not be displayed on the site, but will remain in the database.",
      },
    },
  ],
};

export default NextEdition;
