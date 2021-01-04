import { PostBySlugQuery } from '../../generated/graphql'

import { Unserializable } from './common/unserializable'
import { CoverImage, CoverImageDto } from './coverImage'

export type PostDto = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: CoverImageDto | null
}

export class Post implements Unserializable<PostDto> {
  #slug: string

  #title: string

  #date: Date

  #excerpt: string

  #content: string

  #coverImage: CoverImage | null

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
      : null
  }

  toObject() {
    return {
      slug: this.#slug,
      title: this.#title,
      date: this.#date.toLocaleDateString(),
      excerpt: this.#excerpt,
      content: this.#content,
      coverImage: this.#coverImage?.toObject() ?? null,
    }
  }
}
