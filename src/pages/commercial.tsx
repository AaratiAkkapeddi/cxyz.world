import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getCommercial,
  type Commercial,
  commercialBySlugQuery,
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
    commercial: Commercial,
    news: News
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const commercial = await getCommercial(client, "commercial")
  const news = await getNews(client, "News")

  if (!commercial) {
    return {
      notFound: true,
    }
  }

  if (!news) {
    return {
      notFound: true,
    }
  }


  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      commercial,
      news
    },
  }
}

export default function commercialPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [commercial] = useLiveQuery(props.commercial, commercialBySlugQuery, {
    slug: props.commercial.slug.current,
  })
  const [news] = useLiveQuery(props.news, newsBySlugQuery, {
    slug: props.news.title,
  })



  const works = commercial.work.map((w, i) => {
    return(<li key={i}><a target="_blank" href={w.link}><span>{w.client}</span><span>{w.title}</span></a></li>)
  })

  return (
    <Container news={news}>
      <section className="commercial">
        
        <div className="page__container">
          <h1 className="page__title">{commercial.title}</h1>
          <div className="page__content">
            <PortableText value={commercial.body} />
          </div>
        </div>
        <ul>
          {works}
        </ul>
        
      </section>
    </Container>
  )
}


