import type { CollectionConfig } from "payload";

export const DateEvent: CollectionConfig = {
  slug: "date-event",
  labels: {
    singular: "Date Event",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "initialDate", "endDate", "city", "country"],
    description: "Date of the festival.",
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
      label: "Name",
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
      name: "city",
      type: "text",
      required: true,
      label: "City",
    },
    {
      name: "country",
      type: "text",
      required: true,
      label: "Country",
    },
  ],
};

export default DateEvent;