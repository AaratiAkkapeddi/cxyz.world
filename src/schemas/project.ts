import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  initialValue: {
    private: false,
    video: false,
  },
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
      name:'video',
      type: 'boolean',
      title: 'Is this project moving image/film/video?',
      description: 'If this project is a film, set to true',
    }),
    defineField({
      name:'private',
      type: 'boolean',
      title: 'Should this project be hidden from the projects page?',
      description: 'set to true if you want to hide this project from other parts of the website',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({  
        name: 'media',
        title: 'Image(s)',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    }),
    defineField({  
        name: 'previewPics',
        title: 'Preview Pictures',
        description: 'Image(s) that will appear on homepage & Projects page',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
