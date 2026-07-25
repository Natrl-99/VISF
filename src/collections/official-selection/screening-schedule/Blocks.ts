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
      "Blocks for the Screening Schedule page. The order field determines the order of the blocks.",
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
      type: "date",
      required: true,
      label: "Time",
      admin: {
        date: { pickerAppearance: "timeOnly", displayFormat: "HH:mm" },
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
