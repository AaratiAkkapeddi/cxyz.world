import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
// import Card from '~/components/Card'
import Container from '~/components/Container'
import Link from 'next/link'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
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
    news: News,
    projects: Project[],
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const news = await getNews(client, "News")
  const projects = await getProjects(client)


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      projects,
      news
    },
  }
}

export default function projectsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {

  const [news] = useLiveQuery(props.news, newsBySlugQuery, {
    slug: props.news.title,
  })
  const [projects] = useLiveQuery<Project[]>(props.projects, projectsQuery)

  
  return (
    <Container news={news}>
      <section className="projects">
        
        <div className="page__container">
          <h1 className="page__title">coming soon..</h1>
        </div>
        

        <div className="subnav">
          <ul>
          {projects.length ? (
            projects.map((project, i) => <li key={i}><Link href={"project/" + project.slug.current}>{project.title}</Link></li>)
          ) : (
            "coming soon"
          )}
          </ul>
        </div>
      </section>

    </Container>
  )
}


