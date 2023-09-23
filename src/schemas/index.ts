import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import project from './project'
import mediaItem from './mediaItem'
import figure from './figure'
import embed from './embed'
import about from './about'
import commercial from './commercial'
import blog from './blog'

export const schemaTypes = [post, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, blockContent, mediaItem, embed, figure, about, blog, commercial],
}
