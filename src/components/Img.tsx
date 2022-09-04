import Image from 'next/image'
import { ImgHTMLAttributes } from 'react'

export function Img({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || !alt) {
    throw new Error('src or alt is not passed')
  }

  const replacedAlt = alt.replace(/ *\{[^)]*\} */g, '')

  if (!src.startsWith('/img/')) {
    return <img alt={replacedAlt} src={src} />
  }

  const width = /{([^}]+)x/.exec(alt)?.[1]
  const height = /x([^}]+)}/.exec(alt)?.[1]

  return <Image alt={replacedAlt} height={height} src={src} width={width} />
}
