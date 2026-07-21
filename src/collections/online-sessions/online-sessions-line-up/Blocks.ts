import type { CollectionConfig } from "payload";

export const OnlineSessionsBlocks: CollectionConfig = {
  slug: "online-sessions-blocks",
  labels: {
    singular: "Online Sessions - Block",
    plural: "Online Sessions - Blocks",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "isActive"],
    description:
      "Blocks for the Online Sessions Line Up page. The order field determines the order of the blocks.",
    group: "Online Sessions - Line Up",
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
      name: "intro",
      type: "textarea",
      required: true,
      label: "Block Intro",
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
        {
          name: "country",
          type: "text",
          required: true,
          label: "Country",
        },
        {
          name: "duration",
          type: "text",
          required: true,
          label: "Duration",
          admin: {
            description: "e.g. \"3:05\".",
          },
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Movie Description",
        },
      ],
    },
  ],
};

export default OnlineSessionsBlocks;
