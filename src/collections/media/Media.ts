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
    description:
      "All the images used around the website — homepage, jury photos, sponsor logos, the gallery, and more. You'll usually upload images from inside the section that uses them (like Jury or Sponsors) rather than from here directly.",
  },
  upload: {
    pasteURL: false,
  },
  fields: [
    {
      // Set automatically by createMediaFolderHook / createArrayMediaFolderHook
      // based on which collection/field uploaded the image — not meant to be
      // edited by hand, so it's hidden from the admin UI everywhere Media's
      // fields render (its own edit view and every inline "Create New" upload
      // drawer on other collections).
      name: 'prefix',
      type: 'text',
      label: 'Carpeta en Cloudinary',
      admin: {
        hidden: true,
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