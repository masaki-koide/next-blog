import { ResponsiveImageFragment } from '../../generated/graphql'

export class ResponsiveImage {
  // NOTE:react-datocmsのprops用のクラスなので例外でprivateにしない
  width: number

  height?: number

  title?: string

  alt: string

  src: string

  srcSet?: string

  sizes?: string

  webpSrcSet?: string

  aspectRatio: number

  base64?: string

  constructor(image: ResponsiveImageFragment) {
    if (!image.alt) {
      throw Error(`Invalid respoinsiveImage data: ${image}`)
    }

    this.width = image.width
    this.title = image.title ? image.title : undefined
    this.alt = image.alt
    this.src = image.src
    this.srcSet = image.srcSet
    this.sizes = image.sizes
    this.webpSrcSet = image.webpSrcSet
    this.aspectRatio = image.aspectRatio
    this.base64 = image.base64 ? image.base64 : undefined
  }
}
