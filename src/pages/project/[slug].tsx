import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import { useState } from 'react'
import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import Link from 'next/link'
import { urlForImage } from '~/lib/sanity.image'
import {
  getProject,
  type Project,
  projectBySlugQuery,
  projectSlugsQuery,
  getProjects,projectsQuery, 
  getNews,
  type News,
  newsBySlugQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    project: Project,
    news: News,
    projects: Project[],
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const project = await getProject(client, params.slug)
  const news = await getNews(client, "News")
  const projects = await getProjects(client)
  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      project,
      news,
      projects
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [project] = useLiveQuery(props.project, projectBySlugQuery, {
    slug: props.project.slug.current,
  })
  const [projects] = useLiveQuery<Project[]>(props.projects, projectsQuery)

  const [news] = useLiveQuery(props.news, newsBySlugQuery, {
    slug: props.news.title,
  })
  const lightbox = (e) => {
    let el = e.target;
    if(!el.classList.contains("img-wrapper")){
      el = el.closest(".img-wrapper")
    }
    if(el.classList.contains("lightbox")){
      el.classList.remove("lightbox");
    }else{
      el.classList.add("lightbox");
    }
    

  }
  const [showInfo, setShowInfo] = useState(false)
  const openInfo = () => {
    setShowInfo(!showInfo)
  }
  const med = project.media.map((media, i)=>{

    if(media.embed?.embed?.length > 0){
      return (
      <div key={i} onClick={lightbox} className='img-wrapper'>
        <div className="video-container" dangerouslySetInnerHTML={{ __html: media.embed?.embed }} />
        {media.embed?.caption &&
        <figcaption>{media.embed?.caption?.toString()}</figcaption>
        }
      </div>)
    }else{
      return (
        <div key={i} onClick={lightbox} className='img-wrapper'>
          <Image
          className="project__cover"
          src={urlForImage(media.image).url()}
          height={3000}
          width={3000}
          alt={media.image.altText?.toString() || ""}
        />  
        {media.image?.caption &&
        <figcaption>{media.image?.caption?.toString()}</figcaption>
        }
        </div>
      
      )
    }
  })
  return (
    <Container invert={project.video} news={news}>
      <section className="projects project">
      
        <div className="project__container">
          <h1 className="project__title">{project.title}</h1>
          {project.video ? 
          <div className="project__content">
            <PortableText value={project.body} />
          </div>
        :
        
          <div className="project__content">
            <span className="info-toggle" onClick={openInfo}>{showInfo ? "- less info": "+ more info"}</span>
            {showInfo &&
            <PortableText value={project.body} />
            }
       
          </div>
             }
          <div className="media">
            {med}
          </div>
        </div>
        
      
        <div className="subnav">
          <ul>
          {projects.length ? (
            projects.map((p, i) => <li key={i} className={p.title == project.title ? "on" : ""}><Link href={ p.slug.current}>{p.title}</Link></li>)
          ) : (
            "coming soon"
          )}
          </ul>
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(projectSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/project/${slug}`) || [],
    fallback: 'blocking',
  }
}
