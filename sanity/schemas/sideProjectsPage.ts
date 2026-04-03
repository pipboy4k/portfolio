import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sideProjectsPage',
  title: 'Side Projects — Homepage Card',
  type: 'document',
  // Singleton: only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'cardTitle',
      title: 'Card Title',
      type: 'string',
      description: 'Title shown on the homepage card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'text',
      rows: 3,
      description: 'Description shown on the homepage card.',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown on the homepage card.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'cardOrder',
      title: 'Order',
      type: 'number',
      description: 'Controls where this card appears among other projects on the homepage. Lower numbers appear first.',
    }),
  ],
  preview: {
    select: { title: 'cardTitle', media: 'cardImage' },
    prepare({ title, media }) {
      return { title: title || 'Side Projects — Homepage Card', media }
    },
  },
})
