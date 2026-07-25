import type { CollectionConfig } from "payload";

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
        },
        {
          name: "director",
          type: "text",
          required: true,
          label: "Director",
        },
      ],
    },
  ],
};

export default OnlineScheduleBlocks;
