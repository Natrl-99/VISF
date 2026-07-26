import type { CollectionConfig } from "payload";
import { validateDurationFormat } from "@/lib/validateDuration";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const OnlineSessionsBlocks: CollectionConfig = {
  slug: "online-sessions-blocks",
  labels: {
    singular: "Line Up - Block",
    plural: "Line Up - Blocks",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    description:
      "Blocks for the Online Sessions Line Up page. The order field determines the order of the blocks.",
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
      name: "intro",
      type: "textarea",
      required: true,
      label: "Block Intro",
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
          validate: validateDurationFormat,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Movie Description",
          localized: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default OnlineSessionsBlocks;
