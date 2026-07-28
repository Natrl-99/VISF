import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const OnlineScheduleIntro: CollectionConfig = {
  slug: "online-schedule-intro",
  labels: {
    singular: "Screening Schedule - Introduction Text",
    plural: "Screening Schedule - Introduction Text",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label"],
    description: "The welcome paragraph shown at the top of the Online Screening Schedule page.",
    group: "Online Sessions",
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

export default OnlineScheduleIntro;
