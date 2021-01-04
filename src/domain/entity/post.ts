import { PostBySlugQuery } from '../../generated/graphql'

import { CoverImage } from './coverImage'

export class Post {
  #slug: string

  #title: string

  #date: Date

  #excerpt: string

  #content: string

  #coverImage?: CoverImage

  constructor(post: NonNullable<PostBySlugQuery['post']>) {
    if (
      !post.slug ||
      !post.title ||
      !post.date ||
      !post.excerpt ||
      !post.content
    ) {
      throw Error(`Invalid post data: ${post}`)
    }

    this.#slug = post.slug
    this.#title = post.title
    this.#date = new Date(post.date)
    this.#excerpt = post.excerpt
    this.#content = post.content

    const responsiveImage = post.coverImage?.responsiveImage
    this.#coverImage = responsiveImage
      ? new CoverImage({ responsiveImage })
      : undefined
  }

  getDate() {
    return this.#date.toLocaleDateString()
  }

  getContent() {
    return this.#content
  }

  getCoverImage() {
    return this.#coverImage
  }
}
