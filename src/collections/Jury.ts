import type { CollectionConfig } from 'payload'

export const Jury: CollectionConfig = {
  slug: 'jury-members',
  labels: {
    singular: 'Jurado',
    plural: 'Jurado',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'isActive'],
    description: 'Miembros del jurado que se muestran en "Meet the Jury".',
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
      label: 'Nombre completo',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto',
      admin: {
        description: 'Recomendado: foto cuadrada o retrato, mínimo 800px de ancho.',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Biografía',
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
      admin: {
        description:
          'Desmarca para ocultar temporalmente a un jurado sin borrar su información.',
      },
    },
  ],
}

export default Jury