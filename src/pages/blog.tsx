import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import Card from '~/components/Card'
import {useState, useEffect} from "react"
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
  getPosts, type Post, postsQuery,  
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
    posts: Post[],
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const blog = await getBlog(client, "blog")
  const news = await getNews(client, "News")
  const posts = await getPosts(client)
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
      news,
      posts,
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

  const [posts, setPosts] = useState(0)
  const [modal, setModal] = useState(true)

  const setSubstackPosts = (posts) =>{
    setPosts(posts)
  }
  const closeModal = () => {
     setModal(false)
  }

  useEffect(() => {
    // Update the document title using the browser API
    // generateRandomNumber()

    const RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcxyz.substack.com%2Ffeed`
    fetch(RSS_URL, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((data) => {
      setSubstackPosts(data?.items)
    })
  });
const scale = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
const s = (new Date()).getSeconds();
const randomNumber = Math.floor(scale(s, 0, 60, 0, blog.questions.length - 1));


  return (
    <Container news={news}>
      <div className={modal ? "modal" : "closed modal"}>
        <span>{blog.questions[randomNumber]}</span>
         <textarea></textarea>
         <div>
          <button onClick={closeModal}>submit</button>
         <button onClick={closeModal}>let go</button>
         </div>
      </div>
      <section className="blog">
        
        <div className="page__container">
          <h1 className="page__title">
          {blog.title}</h1>
        </div>
   
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          "coming soon"
        )}
      </section>
    </Container>
  )
}


