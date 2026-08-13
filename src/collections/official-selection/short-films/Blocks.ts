import type { CollectionConfig } from "payload";
import { createArrayMediaFolderHook } from "@/lib/autoTagMediaFolder";
import { validateDurationFormat } from "@/lib/validateDuration";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";
import {
  createArrayMediaCleanupHook,
  createArrayMediaCleanupOnDeleteHook,
} from "@/lib/cleanupOrphanedMedia";

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
      "The groups of films shown on the Official Selection Short Films page (e.g. \"Block 1\", \"Program A\"). Each block has its own name, intro text, and list of films, and they're shown in the order they were created.",
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
          name: "poster",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Poster",
          admin: {
            description: "Recommended: 800×1200px or larger, portrait ~2:3 (standard movie poster ratio, cropped to fill the frame). JPG, PNG, WebP, or HEIC.",
          },
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
    afterChange: [
      createDeepLAutofillHook(),
      createArrayMediaFolderHook("movies", "poster", "posters"),
      createArrayMediaCleanupHook("movies", "poster"),
    ],
    afterDelete: [createArrayMediaCleanupOnDeleteHook("movies", "poster")],
  },
};

export default ShortFilmsBlocks;
