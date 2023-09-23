import { defineArrayMember, defineType } from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
    title: 'Media Item',
    name: 'mediaItem',
    type: 'object',
    description: "Choose from the three options below: Image, pdf, or embed",
    options: {
        collapsible: true,
        collapsed: true,
    },
    initialValue: {
        private: false
    },
    fields: [
        {
        name:'private',
        type: 'boolean',
        title: 'Should this image be hidden from the homepage and projects page?',
        description: 'set to true if you want to hide this image from other parts of the website',
        },
        {name: 'image', 
         type: 'figure', 
         title: 'Image', 
         description: 'upload image if your media item is an image', 
         },
        {name: 'embed', 
         type: 'embed', 
         title: 'Embed', 
         description: 'paste embed code if your media item is from soundcloud, vimeo, youtube, etc. or if your media item is an iframe', 
         options: {
            collapsible: true,
          }
        },
      ],
      preview: {
        select: {
            media: 'image'
        }
      }
})
