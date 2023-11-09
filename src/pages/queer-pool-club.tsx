import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import { useLiveQuery } from 'next-sanity/preview'
import QpcContainer from '~/components/qpcContainer'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import gif from '~/components/qpc/qpc.gif'

import {
  getQpc,
  type Qpc,
  qpcBySlugQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    qpc: Qpc,
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const qpc = await getQpc(client, "queer-pool-club")


  if (!qpc) {
    return {
      notFound: true,
    }
  }




  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      qpc,
    },
  }
}

export default function qpcPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [qpc] = useLiveQuery(props.qpc, qpcBySlugQuery, {
    slug: "props.qpc.slug.current",
  })

  useEffect(() => {

    // if(typeof window != `undefined`){
    //   setInterval(function(){
    //     let imgs = document.querySelectorAll(".qpc-item");
    //     let onIndex = 0;
    //     imgs.forEach((img,i) => {
    //       if(img.classList.contains("on")){
    //         onIndex = i;
    //         img.classList.remove("on");
    //       }
    //     })
    //     if(onIndex == imgs.length -1){
    //       imgs[imgs.length - 1 ].classList.add("on")
    //     }else{
    //       imgs[onIndex + 1 ].classList.add("on")
    //     }
    //   },1200)

      
    // }
    
    
  }, [])


  return (
    <QpcContainer alt={"Queer Pool Club"} news={qpc.about}>
      <section className="qpc">
        
        <div className="page__container">
          
          <div className="page__content">
          <div className="qpc-carousel">
            <div  className="qpc-item on">
              <Image src={gif} alt="Queer Pool Club Posters" />
            </div>
         
        </div>
            <div className="subnav">
              <div>
                <PortableText value={qpc.upcomingInfo} />
              </div>
              
            </div>
            
          </div>
        </div>
        

        
        
      </section>
    </QpcContainer>
  )
}


