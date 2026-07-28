import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    description:
      'The people who can log in to this admin panel. Give most staff the "Editor" role — only trusted admins should be "Administrator", since that role can change what others are allowed to do.',
    group: 'Admin',
  },
  // Restricted to admins only — editors shouldn't see or manage the Users
  // collection at all, which also hides the "Admin" group from the
  // dashboard/nav for them (Payload only lists entities the user can read).
  access: {
    read: ({ req }) => req.user?.role === 'admin',
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrador', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Solo un admin puede cambiar el rol de alguien — evita que un
        // editor se autoasigne permisos de admin.
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}

export default Users