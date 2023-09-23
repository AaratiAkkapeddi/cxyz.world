import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'commercial',
  title: 'Commercial Work',
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({  
      name: 'work',
      title: 'Work',
      type: 'array',
      options: {layout: 'grid'},
      of: [{type: 'commercialWork'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
