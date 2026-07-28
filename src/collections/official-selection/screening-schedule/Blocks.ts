import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const ScreeningBlocks: CollectionConfig = {
  slug: "screening-blocks",
  labels: {
    singular: "Screening Schedule - Block",
    plural: "Screening Schedule - Blocks",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "date", "time"],
    description:
      "The individual screening time slots on the Official Selection Screening Schedule page — each one has a date, a time, a title, and the films playing then. They're shown in date order automatically.",
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
      name: "name",
      type: "text",
      required: true,
      label: "Block Name",
      admin: {
        description: "e.g. \"Block 1\" or a chapter name.",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Block Title",
      localized: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Date",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd/MMM/yyyy" },
      },
    },
    {
      name: "time",
      type: "text",
      required: true,
      label: "Time",
      admin: {
        description: "Free text, e.g. \"19:30\".",
      },
    },
    {
      name: "movies",
      type: "array",
      required: true,
      label: "Movies",
      labels: {
        singular: "Movie",
        plural: "Movies",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Title",
          localized: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default ScreeningBlocks;
