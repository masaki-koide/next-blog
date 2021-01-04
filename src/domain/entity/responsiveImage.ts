import { ResponsiveImageFragment } from '../../generated/graphql'

import { Unserializable } from './common/unserializable'

export type ResponsiveImageDto = {
  width: number
  title: string
  alt: string
  src: string
  srcSet: string
  sizes: string
  webpSrcSet: string
  aspectRatio: number
  base64: string
}

// NOTE:react-datocmsのprops用のクラスなので、undefined(serializeできない)にもnull(型が合わない)にも寄せれない結果、全てのフィールドをNonNullableにした
export class ResponsiveImage implements Unserializable<ResponsiveImageDto> {
  #width: number

  #title: string

  #alt: string

  #src: string

  #srcSet: string

  #sizes: string

  #webpSrcSet: string

  #aspectRatio: number

  #base64: string

  constructor(image: ResponsiveImageFragment) {
    if (!image.title || !image.alt || !image.base64) {
      throw Error(`Invalid respoinsiveImage data: ${JSON.stringify(image)}`)
    }

    this.#width = image.width
    this.#title = image.title
    this.#alt = image.alt
    this.#src = image.src
    this.#srcSet = image.srcSet
    this.#sizes = image.sizes
    this.#webpSrcSet = image.webpSrcSet
    this.#aspectRatio = image.aspectRatio
    this.#base64 = image.base64
  }

  toObject() {
    return {
      width: this.#width,
      title: this.#title,
      alt: this.#alt,
      src: this.#src,
      srcSet: this.#srcSet,
      sizes: this.#sizes,
      webpSrcSet: this.#webpSrcSet,
      aspectRatio: this.#aspectRatio,
      base64: this.#base64,
    }
  }
}
