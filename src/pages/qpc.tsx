import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getQpc,
  type QPC,
  qpcBySlugQuery,
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
    qpc: QPC,
    news: News
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const qpc = await getQpc(client, "qpc")
  const news = await getNews(client, "News")

  if (!qpc) {
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
      qpc,
      news
    },
  }
}

export default function qpcPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [qpc] = useLiveQuery(props.qpc, qpcBySlugQuery, {
    slug: props.qpc.slug.current,
  })
  const [news] = useLiveQuery(props.news, newsBySlugQuery, {
    slug: props.news.title,
  })



  const works = qpc.work.map((w, i) => {
    return(<li key={i}><a href={w.link}><span>{w.client}</span><span>{w.title}</span></a></li>)
  })

  return (
    <Container news={news}>
      <section className="qpc">
        
        <div className="page__container">
          <h1 className="page__title">{qpc.title}</h1>
          {/* <div className="page__content">
            <PortableText value={blog.body} />
          </div> */}
        </div>
        <ul>
          {works}
        </ul>
        
      </section>
    </Container>
  )
}


