import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
// import Card from '~/components/Card'
import Container from '~/components/Container'
import { useEffect, useState } from 'react'
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
  const [arr, setArr] = useState([])
  let tiles = projects.map((p,i)=>{
    let arr = [];
    
    p.previewPics?.map((media,x)=>{

      if(p.private != true){
        
        if(media.image){

          arr.push(
            <div key={i.toString() + x.toString()} className="img-tile fade">
              <Link href={"project/"+p.slug.current}>
                <Image
                  src={urlForImage(media.image).url()}
                  height={500}
                  width={500}
                  alt={media.image.altText?.toString()}
                />  
                <p className="hidden"><span>{p.title}</span></p>
              </Link>
            </div>
          )
        }
      }
    })
    return [arr, [p.mainImage, p.title, "project/" + p.slug.current]]
  
  })
  useEffect(() => {
    let film = tiles.map((t,i) => {
      return (
       
        <div className='film-strip'>
          <Link href={t[1][2]} className="project__card">
             <Image
                  src={urlForImage(t[1][0]).url()}
                  height={500}
                  width={500}
                  alt="click to see project"
                /> <h1>{t[1][1]}</h1></Link>
            <div className='strip-inner'>
              {t[0]}
              {t[0]}
              {t[0]}
            </div>
          </div>
      )
    })
    setArr(film)
  }, [])

  
  return (
    <Container fullBleed={true} news={news}>
      <section className="projects">
        <h1 className="film-title">Projects</h1>
        <div className="film-wrapper">
          {arr}
        </div>
        

        {/* <div className="subnav">
          <ul>
          {projects.length ? (
            projects.map((project, i) => <li key={i}><Link href={"project/" + project.slug.current}>{project.title}</Link></li>)
          ) : (
            "coming soon"
          )}
          </ul>
        </div> */}
      </section>

    </Container>
  )
}


