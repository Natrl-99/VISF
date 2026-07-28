import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const ShortFilmsIntro: CollectionConfig = {
  slug: "short-films-intro",
  labels: {
    singular: "Short Films - Introduction Text",
    plural: "Short Films - Introduction Text",
  },
  admin: {
    useAsTitle: "text",
    defaultColumns: ["text"],
    description: "The welcome paragraph shown at the top of the Official Selection Short Films page.",
    group: "Official Selection",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "short-films-intro" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "text",
      type: "textarea",
      required: true,
      label: "Intro Text",
      localized: true,
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default ShortFilmsIntro;
