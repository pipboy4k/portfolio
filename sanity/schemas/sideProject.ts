import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sideProject',
  title: 'Side Project',
  type: 'document',
  // Singleton: only one document should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Shown on the homepage card and as the page heading.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown on the homepage card.',
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
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      description: 'Add text and images one by one to build the page.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
        {
          type: 'object',
          name: 'videoFile',
          title: 'Video File',
          fields: [
            defineField({
              name: 'file',
              title: 'Video File',
              type: 'file',
              options: { accept: 'video/mp4,video/webm' },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'file' },
            prepare() {
              return { title: 'Video File' }
            },
          },
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'Video Embed',
          fields: [
            defineField({
              name: 'url',
              title: 'Embed URL',
              type: 'url',
              description: 'Paste the Loom embed URL (e.g. https://www.loom.com/embed/...)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: { url: 'url' },
            prepare(value: Record<string, any>) {
              return { title: 'Video Embed', subtitle: value.url }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'cardImage' },
    prepare({ title, media }) {
      return { title: title || 'Side Project', media }
    },
  },
})
