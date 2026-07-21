import type { CollectionConfig } from "payload";

export const OnlineScheduleBlocks: CollectionConfig = {
  slug: "online-schedule-blocks",
  labels: {
    singular: "Online Screening Schedule - Block",
    plural: "Online Screening Schedule - Blocks",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "isActive"],
    description:
      "Blocks for the Online Screening Schedule page. The order field determines the order of the blocks.",
    group: "Online Screening Schedule",
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
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Visible on the site",
      admin: {
        description:
          "If unchecked, this block will not be displayed on the site, but will remain in the database.",
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
