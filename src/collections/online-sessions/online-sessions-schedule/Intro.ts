import type { CollectionConfig } from "payload";

export const OnlineScheduleIntro: CollectionConfig = {
  slug: "online-schedule-intro",
  labels: {
    singular: "Online Screening Schedule - Intro",
    plural: "Online Screening Schedule - Intros",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "isActive"],
    description: "Intro text shown at the top of the Online Screening Schedule page.",
    group: "Online Screening Schedule",
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
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Visible on the site",
      admin: {
        description:
          "If unchecked, this intro will not be displayed on the site, but will remain in the database.",
      },
    },
  ],
};

export default OnlineScheduleIntro;
