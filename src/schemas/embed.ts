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
  title: 'Embed',
  name: 'embed',
  type: 'object',
  fields: [
      {name: 'embed', type: 'text', title: 'Embed Code', description: 'paste embed code if your media item is from soundcloud, vimeo, youtube, etc. or if your media item is an iframe'},
      {name: 'altText', type: 'text', title: 'Alt Text', description: 'alt text for your embed'},
      {name: 'caption', type: 'text', title: 'caption', description: 'caption for your embed'}
    ]
})
