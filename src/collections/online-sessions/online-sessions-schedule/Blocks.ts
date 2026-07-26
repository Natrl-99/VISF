import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const OnlineScheduleBlocks: CollectionConfig = {
  slug: "online-schedule-blocks",
  labels: {
    singular: "Online Screening Schedule - Block",
    plural: "Online Screening Schedule - Blocks",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title"],
    description:
      "Blocks for the Online Screening Schedule page. The order field determines the order of the blocks.",
    group: "Online Sessions",
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
        {
          name: "director",
          type: "text",
          required: true,
          label: "Director",
          localized: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default OnlineScheduleBlocks;
