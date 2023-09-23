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
  title: 'Commercial Work',
  name: 'commercialWork',
  type: 'object',
  description: "Add the publication/client, title, and link",
    options: {
        collapsible: true,
        collapsed: true,
    },
  fields: [
      {name: 'link', type: 'url', title: 'Link', description: 'link to project'},
      {name: 'title', type: 'string', title: 'title', description: 'title or brief (short sentence) description of project'},
      {name: 'client', type: 'string', title: 'Client', description: 'Client or publication'}
    ]
})
