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
    description: "Imagenes que se almacenan en el servidor y son usadas en HomePage, Jury y Sponsors. Cuando conectemos Cloudinary, este bloque se reemplaza por el storage adapter correspondiente — el resto de las colecciones que usan 'relationTo: media' no necesitan cambiar nada.",
  },
  upload: {
    // TEMPORAL: guarda los archivos en disco local dentro del proyecto,
    // para poder probar el flujo ya mismo. Cuando conectemos Cloudinary,
    // este bloque se reemplaza por el storage adapter correspondiente —
    // el resto de las colecciones que usan "relationTo: 'media'" no
    // necesitan cambiar nada.
    staticDir: 'media',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo (accesibilidad)',
    },
  ],
}

export default Media