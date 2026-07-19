import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  labels: {
    singular: 'Patrocinador',
    plural: 'Patrocinadores',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'isActive'],
    description: 'Logos que aparecen en el footer y en la franja bajo el hero.',
    group: 'Home',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre del patrocinador',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
      admin: {
        description: 'Preferir PNG con fondo transparente o SVG.',
      },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Sitio web (opcional)',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'Orden de aparición',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Visible en el sitio',
    },
  ],
}

export default Sponsors