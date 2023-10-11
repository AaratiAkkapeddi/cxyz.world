import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'
import { PortableText } from '@portabletext/react'
import { useState } from "react";

export default function Card({ post }: { post: Post }) {
  const [toggle, setToggle] = useState(false);
  const toggleToggle = () => setToggle(!toggle);
  return (
    <div className="card">
 
      <div onClick={toggleToggle} className={toggle ?"open card__container" : "card__container"} >
        <span className="card__date" >{formatDate(post._createdAt)}{toggle ? "   -" : ""}</span>
        <div>

          <span className={toggle ? "card__title open": "card__title"}>
            {post.title}
          </span>

          <div className="card__body">
            {toggle &&
            <PortableText value={post.body} />
            }
            
          </div>

        </div>
      </div>
    </div>
  )
}
