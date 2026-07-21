import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    group: 'Photos',
    description: "Imagenes que se almacenan en Cloudinary y son usadas en HomePage, Jury y Sponsors.",
  },
  upload: true,
  fields: [
    {
      name: 'prefix',
      type: 'text',
      label: 'Carpeta en Cloudinary',
      admin: {
        description:
          "Subcarpeta dentro de VISF en Cloudinary (ej: jury, sponsors, banner). Dejar en blanco para VISF directamente.",
      },
      access: {
        read: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}

export default Media