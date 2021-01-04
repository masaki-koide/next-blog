import { ResponsiveImageFragment } from '../../generated/graphql'

import { Unserializable } from './common/unserializable'
import { ResponsiveImage, ResponsiveImageDto } from './responsiveImage'

export type CoverImageDto = {
  responsiveImage: ResponsiveImageDto
}
export class CoverImage implements Unserializable<CoverImageDto> {
  #responsiveImage: ResponsiveImage

  constructor(coverImage: { responsiveImage: ResponsiveImageFragment }) {
    this.#responsiveImage = new ResponsiveImage(coverImage.responsiveImage)
  }

  toObject() {
    return {
      responsiveImage: this.#responsiveImage.toObject(),
    }
  }
}
