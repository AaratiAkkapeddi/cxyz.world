import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { useEffect, useState } from 'react'

export default function Container(props, { children }: { children: React.ReactNode }) {
  const [mobileNav, setmobileNav] = useState(false)
  const openNav = () => {
    setmobileNav(!mobileNav)
  }
  return (
    <div className={props.invert ? "container inverted": "container"}>
      <ul className={mobileNav ? "mobile-burger open": "mobile-burger"} onClick={openNav}>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <nav className={mobileNav ? "open" : ""}>
        <ul>
          <li><Link href="/"><h1>chen xiangyun<br></br>谌翔云</h1></Link></li>
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
      <main className={props.fullBleed ? "full-bleed":""}>{props.children}</main>
    </div>
  )
}
