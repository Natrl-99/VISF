import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { buildConfig } from "payload";

//users
import Users from "./src/collections/users/Users";
//media
import Media from "./src/collections/media/Media";
//jury
import Jury from "./src/collections/homepage/jury/Jury";
//sponsor
import Sponsors from "./src/collections/homepage/sponsors/Sponsors";

//homepage
import Introduction from "./src/collections/homepage/introduction/Introduction";
import { DateEvent } from "@/collections/homepage/gallery/DateEvent";
import { Video } from "@/collections/homepage/video/Video";
import { Competition } from "@/collections/homepage/competitions/Competition";
import { Categories } from "@/collections/homepage/categories/Categories";

//official selection
import { Winners } from "@/collections/official-selection/winners/winners";

//online sessions
import { NextEdition } from "@/collections/online-sessions/online-sessions-line-up/NextEdition";

import { OnlineSessionsIntro } from "@/collections/online-sessions/online-sessions-line-up/Intro";
import { OnlineSessionsBlocks } from "@/collections/online-sessions/online-sessions-line-up/Blocks";

import { OnlineScheduleIntro } from "@/collections/online-sessions/online-sessions-schedule/Intro";
import { OnlineScheduleBlocks } from "@/collections/online-sessions/online-sessions-schedule/Blocks";

//cloudinary
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
    NextEdition,
    OnlineSessionsIntro,
    OnlineSessionsBlocks,
    OnlineScheduleIntro,
    OnlineScheduleBlocks,
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
