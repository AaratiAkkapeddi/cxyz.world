import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'

// import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getProjects, type Project, projectsQuery,   
  getNews,
  type News,
  newsBySlugQuery, } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    projects: Project[],
    news: News
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const projects = await getProjects(client)
  const news = await getNews(client, "News")
  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      projects,
      news
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [projects] = useLiveQuery<Project[]>(props.projects, projectsQuery)
  const [news] = useLiveQuery(props.news, newsBySlugQuery, {
    slug: props.news.title,
  })
  const tiles = projects.map((p,i)=>{
    let arr = [];
    p.media?.map((media,i)=>{
      
      if(!media.private){
        
        if(media.image){

          arr.push(
            <div className="img-tile">
              <Link href={"project/"+p.slug.current}>
                <Image
                  src={urlForImage(media.image).url()}
                  height={500}
                  width={500}
                  alt={media.image.altText?.toString()}
                />  
                <div className="hidden"><span>{p.title}</span></div>
              </Link>
            </div>
          )
        }
      }
    })
    return arr
  })

  return (
    <Container news={news}>
      <section>
        {projects.length ? (
          projects.map((project) => <div>{project.title}</div>)
        ) : (
          <Welcome />
        )}
        {tiles}
      </section>
    </Container>
  )
}
