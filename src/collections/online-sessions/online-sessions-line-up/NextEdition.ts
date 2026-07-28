import type { CollectionConfig } from "payload";
import { validateEndDateAfterInitialDate } from "@/lib/validateDateRange";

export const NextEdition: CollectionConfig = {
  slug: "online-sessions-next-edition",
  labels: {
    singular: "Line Up - Next Edition Date",
    plural: "Line Up - Next Edition Date",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "initialDate", "endDate"],
    description: "The 'save the date' announcement for the next Online Sessions Line Up edition, shown on that page.",
    group: "Online Sessions",
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
      validate: validateEndDateAfterInitialDate,
    },
  ],
};

export default NextEdition;
