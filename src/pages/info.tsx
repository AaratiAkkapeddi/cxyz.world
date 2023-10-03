import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getAbout,
  type About,
  aboutBySlugQuery,
  aboutSlugsQuery,
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
    about: About,
    news: News
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const about = await getAbout(client, "about")
  const news = await getNews(client, "News")

  if (!about) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      about,
      news
    },
  }
}

export default function aboutPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [about] = useLiveQuery(props.about, aboutBySlugQuery, {
    slug: props.about.slug.current,
  })
  const [news] = useLiveQuery(props.news, newsBySlugQuery, {
    slug: props.news.title,
  })
  return (
    <Container news={news}>
      <section className="about">
        
        <div className="page__container">
          <div className="page__content">
            <PortableText value={about.body} />
          </div>
        </div>
        {about.mainImage ? (
          <Image
            className="page__cover"
            src={urlForImage(about.mainImage).url()}
            height={231}
            width={367}
            alt=""
          />
        ) : (
          <div className="page__cover--none" />
        )}
      </section>
    </Container>
  )
}

