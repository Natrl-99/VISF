import type { CollectionConfig } from "payload";
import { validateEndDateAfterInitialDate } from "@/lib/validateDateRange";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const DateEvent: CollectionConfig = {
  slug: "date-event",
  labels: {
    singular: "Date Event",
    plural: "Date Event",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "initialDate", "endDate", "city", "country"],
    description: "Date of the festival.",
    group: "Home",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "date-event" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
      localized: true,
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
    {
      name: "city",
      type: "text",
      required: true,
      label: "City",
      localized: true,
    },
    {
      name: "country",
      type: "text",
      required: true,
      label: "Country",
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default DateEvent;