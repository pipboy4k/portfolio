import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order on the homepage. Lower numbers appear first.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2025 or 2020 — 2023',
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      type: 'text',
      rows: 3,
      description: 'Text shown on the homepage project card. If not set, Summary is used.',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown on the homepage project card. If not set, Cover Image is used.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'storeLinks',
      title: 'Store Links',
      type: 'array',
      description: 'Add App Store, Google Play, or web links.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'App Store', value: 'appStore' },
                  { title: 'Google Play', value: 'googlePlay' },
                  { title: 'Web', value: 'web' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { type: 'type', url: 'url' },
            prepare({ type, url }) {
              const labels: Record<string, string> = { appStore: 'App Store', googlePlay: 'Google Play', web: 'Web' }
              return { title: labels[type] || type, subtitle: url }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'metadata',
      title: 'Project Metadata',
      type: 'array',
      description: 'Key details shown under the cover image (e.g. My role, Team, Timeline, Platform)',
      of: [
        {
          type: 'object',
          name: 'metadataItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. My role, Team, Timeline, Platform',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short description shown on the project card.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Case Study',
      type: 'array',
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
            defineField({
              name: 'backgroundColor',
              title: 'Frame Background Color',
              type: 'string',
              description: 'Optional: CSS color for the image frame (e.g. #f5f5f5, #0a0a0a). Leave blank for transparent.',
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
              name: 'backgroundColor',
              title: 'Frame Background Color',
              type: 'string',
              description: 'Optional: CSS color for the video frame (e.g. #f5f5f5, #0a0a0a). Leave blank for transparent.',
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
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' as const }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'coverImage',
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: year?.toString(),
        media,
      }
    },
  },
})
