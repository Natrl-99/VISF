import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const Competition: CollectionConfig = {
  slug: "competition",
  labels: {
    singular: "Main Competition",
    plural: "Main Competitions",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"], 
    description: "The festival's competitions or sections (e.g. main competition, shorts competition), shown on the homepage.",
    group: "Homepage",
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
      label: "Competition Name",
      localized: true,
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default Competition;