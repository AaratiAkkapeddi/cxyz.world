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
  title: 'Image',
  name: 'figure',
  type: 'image',
  options: { hotspot:true},
  fields: [
      {name: 'altText', type: 'text', title: 'Alt Text', description: 'description for screen readers'},
      {name: 'caption', type: 'text', title: 'Caption', description: 'caption for your image'}
    ]
})
