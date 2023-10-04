import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '~/lib/sanity.image'
import { useEffect } from 'react'
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

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  let tiles = projects.map((p,i)=>{
    let arr = [];
    p.media?.map((media,i)=>{
      
      if(!media.private){
        
        if(media.image){

          arr.push(
            <div key={i} className="img-tile">
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
    return arr
  })

  useEffect(() => {
    tiles = tiles.flat()
    shuffle(tiles)
  }, [])

  
  

  return (
    <Container news={news}>
      <section>
        {projects.length ? (
          projects.map((project) => <div>{project.title}</div>)
        ) : (
          <Welcome />
        )}
        {shuffle(tiles)}
      </section>
    </Container>
  )
}
