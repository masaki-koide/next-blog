import { ResponsiveImageFragment } from '../../generated/graphql'

import { ResponsiveImage } from './responsiveImage'

export class CoverImage {
  #responsiveImage: ResponsiveImage

  constructor(coverImage: { responsiveImage: ResponsiveImageFragment }) {
    this.#responsiveImage = new ResponsiveImage(coverImage.responsiveImage)
  }

  getResponsiveImage() {
    return this.#responsiveImage
  }
}
