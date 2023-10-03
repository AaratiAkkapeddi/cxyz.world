import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog Page',
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
      name: 'questions',
      title: 'Questions',
      type: 'array',
      options: {layout: 'grid'},
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
