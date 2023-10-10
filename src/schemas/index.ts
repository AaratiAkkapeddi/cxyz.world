import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import post from './post'
import project from './project'
import mediaItem from './mediaItem'
import figure from './figure'
import embed from './embed'
import about from './about'
import commercial from './commercial'
import qpc from './qpc'
import blog from './blog'
import news from './news'
import commercialWork from './commercialWork'

export const schemaTypes = [post, blockContent, project, mediaItem, embed, figure, about, blog, commercial, qpc, commercialWork, news]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, blockContent, mediaItem, embed, figure, about, blog, commercial, commercialWork, qpc, news],
}
