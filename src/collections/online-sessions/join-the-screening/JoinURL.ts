import type { CollectionConfig } from "payload";
import { validateUrlFormat } from "@/lib/validateUrl";

export const JoinURL: CollectionConfig = {
  slug: "online-sessions-join-url",
  labels: {
    singular: "Join the Screening - Link",
    plural: "Join the Screening - Link"
  },
  admin: {
    useAsTitle: "url",
    defaultColumns: ["url"],
    description: "The link the \"Join the Screening\" card on the Online Sessions page points to.",
    group: "Online Sessions",
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false;
      const { totalDocs } = await req.payload.count({ collection: "online-sessions-join-url" });
      return totalDocs === 0;
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
      validate: validateUrlFormat,
    },
  ],
};

export default JoinURL;
