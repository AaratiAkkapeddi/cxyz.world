import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import logo from "~/components/QPC.svg"


export default function QpcContainer(props, { children }: { children: React.ReactNode }) {

  return (
    <div className={props.invert ? "qpc-container inverted": "qpc-container"}>
      <nav>
        <ul>
          <li><Link href="/"><Image className="logos__entry" src={logo} alt="Sanity Logo" /></Link></li>
          <li><PortableText value={props.news} /></li>
        </ul>
 
        <ul>
          <li><a href="">instagram</a></li>
        </ul>

      </nav>
      <main className={props.fullBleed ? "full-bleed":""}>{props.children}</main>
    </div>
  )
}
