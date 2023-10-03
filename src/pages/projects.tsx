import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import Card from '~/components/Card'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getBlog,
  type Blog,
  blogBySlugQuery,
  blogSlugsQuery,
  getNews,
  type News,
  newsBySlugQuery,
  getProjects, type Project, projectsQuery,  
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    blog: Blog,
    news: News,
    projects: Project[],
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const blog = await getBlog(client, "blog")
  const news = await getNews(client, "News")
  const projects = await getProjects(client)
  if (!blog) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      blog,
      projects,
      news
    },
  }
}

export default function blogPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [blog] = useLiveQuery(props.blog, blogBySlugQuery, {
    slug: "blog",
  })
  const [news] = useLiveQuery(props.news, newsBySlugQuery, {
    slug: props.news.title,
  })
  const [projects] = useLiveQuery<Project[]>(props.projects, projectsQuery)

  return (
    <Container news={news}>
      <section className="blog">
        
        <div className="page__container">
          <h1 className="page__title">{blog.title}</h1>
          {/* <div className="page__content">
            <PortableText value={blog.body} />
          </div> */}
        </div>
        {blog.mainImage ? (
          <Image
            className="page__cover"
            src={urlForImage(blog.mainImage).url()}
            height={231}
            width={367}
            alt=""
          />
        ) : (
          <div className="page__cover--none" />
        )}
        {projects.length ? (
          projects.map((project) => <Card key={project._id} project={project} />)
        ) : (
          "coming soon"
        )}
      </section>
    </Container>
  )
}


