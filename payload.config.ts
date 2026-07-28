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
//gallery
import Gallery from "./src/collections/gallery/gallery";
//sponsor
import Sponsors from "./src/collections/homepage/sponsors/Sponsors";

//homepage
import Introduction from "./src/collections/homepage/introduction/Introduction";
import { DateEvent } from "@/collections/homepage/date/DateEvent";
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
import ShortFilmsNextEdition from "@/collections/official-selection/short-films/NextEdition";
import ShortFilmsIntro from "@/collections/official-selection/short-films/Intro";
import ShortFilmsBlocks from "@/collections/official-selection/short-films/Blocks";
import ScreeningIntro from "@/collections/official-selection/screening-schedule/Intro";
import ScreeningBlocks from "@/collections/official-selection/screening-schedule/Blocks";

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    components: {
      graphics: {
        Logo: "@/app/(payload)/admin/components/Logo#Logo",
        Icon: "@/app/(payload)/admin/components/Icon#Icon",
      },
      views: {
        dashboard: {
          Component: "@/app/(payload)/admin/components/Dashboard#Dashboard",
        },
      },
    },
  },
  secret: process.env.PAYLOAD_SECRET || "",
  localization: {
    locales: ["en", "it"],
    defaultLocale: "en",
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  editor: lexicalEditor({}),
  collections: [
    //Users
    Users,
    //Media
    Media,
    //Homepage
    Introduction,
    DateEvent,
    Video,
    Jury,
    Competition,
    Categories,
    Sponsors,
    Gallery,
    //Official Selection
    ShortFilmsNextEdition,
    ShortFilmsIntro,
    ShortFilmsBlocks,
    ScreeningIntro,
    ScreeningBlocks,
    Winners,
    //Online Sessions
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
