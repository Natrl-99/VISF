import type { CollectionConfig } from "payload";
import { createDeepLAutofillHook } from "@/lib/deeplAutofillHook";

export const Competition: CollectionConfig = {
  slug: "competition",
  labels: {
    singular: "Competition",
    plural: "Competitions",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "isActive"],
    description: "Competition for the festival.",
    group: "Home",
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
    {
      name: "isActive",
      type: "checkbox",
      label: "Is Active",
      defaultValue: true,
      admin: {
        description: "Check this box to make the competition active."
      }
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook()],
  },
};

export default Competition;