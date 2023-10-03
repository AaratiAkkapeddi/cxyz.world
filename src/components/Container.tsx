import Link from 'next/link'
import { PortableText } from '@portabletext/react'


export default function Container(props, { children }: { children: React.ReactNode }) {

  return (
    <div className={props.invert ? "container inverted": "container"}>
      <nav>
        <ul>
          <li><Link href="/"><h1>chen xiangyun</h1></Link></li>
          <li><Link href='/info'>Info</Link></li>
          <li><Link href='/projects'>Projects</Link></li>
          <li><Link href='/blog'>Blog</Link></li>
          <li><Link href='/commercial'>Commercial</Link></li>
        </ul>
        <div>
         news:<br></br>
         <PortableText value={props.news?.body} />
        </div>
        <ul>
          <li><a href="">email</a></li>
          <li><a href="">newsletter</a></li>
          <li><a href="">instagram</a></li>
          <li>© XIANGYUN CHEN 2023</li>
        </ul>

      </nav>
      <main>{props.children}</main>
    </div>
  )
}
