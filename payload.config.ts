import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import Users from './src/collections/Users'
import Media from './src/collections/Media'
import Jury from './src/collections/homepage/jury/Jury'
import Sponsors from './src/collections/homepage/sponsors/Sponsors'
import Introduction from './src/collections/homepage/introduction/Introduction'
import { DateEvent } from '@/collections/homepage/gallery/DateEvent'
import { Video } from '@/collections/homepage/video/Video'
import { Competition } from '@/collections/homepage/competitions/Competition'
import { Categories } from '@/collections/homepage/categories/Categories'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor({}),
  collections: [Users, Media, Jury, Sponsors, Introduction, DateEvent, Video, Competition, Categories],
  typescript: {
    outputFile: 'src/payload-types.ts',
  }
})