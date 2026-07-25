import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const ScreeningIntro: CollectionConfig = {
  slug: "screening-intro",
  labels: {
    singular: "Screening Schedule - Introduction",
    plural: "Screening Schedule - Introduction",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label"],
    description: "Intro text shown at the top of the Screening Schedule page.",
    group: "Official Selection",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "online-schedule-intro" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      label: "Label",
      admin: {
        description: "Internal name to identify this intro in the admin, e.g. \"2027 Online Screening Schedule\".",
      },
    },
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

export default ScreeningIntro;
