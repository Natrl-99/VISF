import type { CollectionConfig } from "payload";
import { createArrayMediaFolderHook } from "@/lib/autoTagMediaFolder";

export const ShortFilmsBlocks: CollectionConfig = {
  slug: "short-films-blocks",
  labels: {
    singular: "Short Films - Block",
    plural: "Short Films - Blocks",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    description:
      "Blocks for the Official Selection Short Films. The order field determines the order of the blocks.",
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
      name: "intro",
      type: "textarea",
      required: true,
      label: "Block Intro",
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
          name: "poster",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Poster",
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
  hooks: {
    afterChange: [createArrayMediaFolderHook("movies", "poster", "posters")],
  },
};

export default ShortFilmsBlocks;
