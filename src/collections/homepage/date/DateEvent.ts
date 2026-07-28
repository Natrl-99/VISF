import type { CollectionConfig } from "payload";
import { validateEndDateAfterInitialDate } from "@/lib/validateDateRange";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const DateEvent: CollectionConfig = {
  slug: "date-event",
  labels: {
    singular: "Event Date",
    plural: "Event Date",
  },
  admin: {
    useAsTitle: "city",
    defaultColumns: ["city", "initialDate", "endDate", "country"],
    description: "When and where the festival takes place. Shown at the top of the homepage, under the welcome text.",
    group: "Homepage",
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