import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { buildConfig } from "payload";

import Users from "./src/collections/users/Users";
import Media from "./src/collections/media/Media";
import Jury from "./src/collections/homepage/jury/Jury";
import Sponsors from "./src/collections/homepage/sponsors/Sponsors";
import Introduction from "./src/collections/homepage/introduction/Introduction";
import { DateEvent } from "@/collections/homepage/gallery/DateEvent";
import { Video } from "@/collections/homepage/video/Video";
import { Competition } from "@/collections/homepage/competitions/Competition";
import { Categories } from "@/collections/homepage/categories/Categories";
import { Winners } from "@/collections/winners/winners";
import { cloudinaryAdapter } from "./src/lib/cloudinaryStorageAdapter";

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      graphics: {
        Logo: "@/app/(payload)/admin/components/Logo#Logo",
        Icon: "@/app/(payload)/admin/components/Icon#Icon",
      },
    },
  },
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  editor: lexicalEditor({}),
  collections: [
    Users,
    Media,
    Jury,
    Sponsors,
    Introduction,
    DateEvent,
    Video,
    Competition,
    Categories,
    Winners,
  ],
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
          prefix: "",
        },
        video: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
          prefix: "video",
        },
      },
    }),
  ],
  typescript: {
    outputFile: "src/payload-types.ts",
  },
});
