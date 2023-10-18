import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'
import { Url } from 'next/dist/shared/lib/router/router'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}



/**************ABOUT**********************/

export const aboutQuery = groq`*[_type == "about" && defined(slug.current)] | order(_createdAt desc)`

export async function getAbouts(client: SanityClient): Promise<About[]> {
  return await client.fetch(aboutQuery)
}

export const aboutBySlugQuery = groq`*[_type == "about" && slug.current == $slug][0]`

export async function getAbout(
  client: SanityClient,
  slug: string,
): Promise<About> {
  return await client.fetch(aboutBySlugQuery, {
    slug,
  })
}

export const aboutSlugsQuery = groq`
*[_type == "about" && defined(slug.current)][].slug.current
`

export interface About {
  _type: 'about'
  _id: string
  title?: string
  slug: Slug
  mainImage?: ImageAsset
  body: PortableTextBlock[]
}
/***********BLOG**************/
export const blogQuery = groq`*[_type == "blog" && defined(slug.current)] | order(_createdAt desc)`

export async function getBlogs(client: SanityClient): Promise<Blog[]> {
  return await client.fetch(blogQuery)
}

export const blogBySlugQuery = groq`*[_type == "blog" && slug.current == $slug][0]`

export async function getBlog(
  client: SanityClient,
  slug: string,
): Promise<Blog> {
  return await client.fetch(blogBySlugQuery, {
    slug,
  })
}

export const blogSlugsQuery = groq`
*[_type == "blog" && defined(slug.current)][].slug.current
`

export interface Blog {
  _type: 'blog'
  _id: string
  title?: string
  slug: Slug
  mainImage?: ImageAsset
  questions: string[]
}

/****************COMMERCIAL******************/
export const commercialQuery = groq`*[_type == "commercial" && defined(slug.current)] | order(_createdAt desc)`

export async function getCommercials(client: SanityClient): Promise<Commercial[]> {
  return await client.fetch(commercialQuery)
}

export const commercialBySlugQuery = groq`*[_type == "commercial" && slug.current == $slug][0]`

export async function getCommercial(
  client: SanityClient,
  slug: string,
): Promise<Commercial> {
  return await client.fetch(commercialBySlugQuery, {
    slug,
  })
}

export const commercialSlugsQuery = groq`
*[_type == "commercial" && defined(slug.current)][].slug.current
`

export interface Commercial {
  _type: 'commercial'
  _id: string
  title?: string
  slug: Slug
  mainImage?: ImageAsset
  body: PortableTextBlock[]
  work: {
    title: string,
    client: string,
    link: string
  }[]
}

/***************NEWS*******************/
export const newsQuery = groq`*[_type == "news" && defined(name)] | order(_createdAt desc)`

export async function getNewss(client: SanityClient): Promise<News[]> {
  return await client.fetch(newsQuery)
}

export const newsBySlugQuery = groq`*[_type == "news" && title == $title][0]`

export async function getNews(
  client: SanityClient,
  title: string,
): Promise<News> {
  return await client.fetch(newsBySlugQuery, {
    title,
  })
}

export const newsSlugsQuery = groq`
*[_type == "news" && defined(title)][].title
`

export interface News {
  _type: 'news'
  _id: string
  title?: string
  body: PortableTextBlock[]
}


/**** PROJECTS *****/

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(_createdAt desc)`

export async function getProjects(client: SanityClient): Promise<Project[]> {
  return await client.fetch(projectsQuery)
}

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]`

export async function getProject(
  client: SanityClient,
  slug: string,
): Promise<Project> {
  return await client.fetch(projectBySlugQuery, {
    slug,
  })
}

export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`

export interface Project {
  _type: 'project'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  video: boolean
  private: boolean
  excerpt?: string
  mainImage?: ImageAsset
  media: {
    image: ImageAsset,
    embed:{
      embed: string
      altText: string
      caption : string
    },
  }[],
  previewPics: {
    image: ImageAsset,
    embed:{
      embed: string
      altText: string
      caption : string
    },
  }[]
  body: PortableTextBlock[]
}

/******* QPC*******/


export const qpcQuery = groq`*[_type == "qpc" && defined(slug.current)] | order(_createdAt desc)`

export async function getQpcs(client: SanityClient): Promise<Qpc[]> {
  return await client.fetch(qpcQuery)
}

export const qpcBySlugQuery = groq`*[_type == "qpc" && slug.current == $slug][0]`

export async function getQpc(
  client: SanityClient,
  slug: string,
): Promise<Qpc> {
  return await client.fetch(qpcBySlugQuery, {
    slug,
  })
}

export const qpcSlugsQuery = groq`
*[_type == "qpc" && defined(slug.current)][].slug.current
`

export interface Qpc {
  _type: 'qpc'
  _id: string
  title?: string
  slug: Slug
  about: PortableTextBlock[]
  upcomingInfo: PortableTextBlock[]
}