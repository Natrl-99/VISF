import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const Introduction: CollectionConfig = {
  slug: "introduction",
  labels: {
    singular: "Introduction Text",
    plural: "Introduction Text ",
  },
  admin: {
    useAsTitle: "text",
    defaultColumns: ["text"],
    description: "The short welcome paragraph shown near the top of the homepage, just under the festival dates.",
    group: "Homepage",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "introduction" });
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
      label: "Introduction Text",
      localized: true,
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default Introduction;
