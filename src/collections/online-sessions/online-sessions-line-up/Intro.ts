import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const OnlineSessionsIntro: CollectionConfig = {
  slug: "online-sessions-intro",
  labels: {
    singular: "Line Up - Introduction Text",
    plural: "Line Up - Introduction Text",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label"],
    description: "The welcome paragraph shown at the top of the Online Sessions Line Up page.",
    group: "Online Sessions",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "online-sessions-intro" });
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
        description: "Internal name to identify this intro in the admin, e.g. \"2027 Online Sessions\".",
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

export default OnlineSessionsIntro;
