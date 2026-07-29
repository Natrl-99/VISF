import type { CollectionConfig } from 'payload'
import { createMediaFolderHook } from '@/lib/autoTagMediaFolder'
import { createMediaCleanupHook, createMediaCleanupOnDeleteHook } from '@/lib/cleanupOrphanedMedia'
import { createDeepLAutofillHook } from '@/lib/deeplAutofillHook'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: 'Sponsor',
    plural: 'Sponsors',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    description: 'The festival\'s sponsors and their logos, shown in the footer. Only 8 can be listed at once — delete one before adding a new one.',
    group: 'Homepage',
  },
  access: {
    read: () => true,
    create: async ({ req }) => {
      if (!req.user) return false
      const { totalDocs } = await req.payload.count({ collection: 'sponsors' })
      return totalDocs < 8
    },
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Sponsor Name',
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
      admin: {
        description: 'Recommended: logo with transparent background, minimum 400px wide.',
      },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Website URL (optional)',
    },
  ],
  hooks: {
    afterChange: [createDeepLAutofillHook(), createMediaFolderHook('logo', 'sponsors'), createMediaCleanupHook('logo')],
    afterDelete: [createMediaCleanupOnDeleteHook('logo')],
  },
}

export default Sponsors