import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'qpc',
  title: 'Queer Pool Club',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'blockContent',
    }),
    defineField({
        name: 'upcomingInfo',
        title: 'Upcoming Info',
        type: 'blockContent',
      }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
