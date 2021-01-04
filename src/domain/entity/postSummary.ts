import { PostsPerPageQuery } from '../../generated/graphql'

import { Unserializable } from './common/unserializable'

export type PostSummaryDto = {
  slug: string
  title: string
  date: string
  excerpt: string
}

export class PostSummary implements Unserializable<PostSummaryDto> {
  #slug: string

  #title: string

  #date: Date

  #excerpt: string

  constructor(post: NonNullable<PostsPerPageQuery['allPosts'][number]>) {
    if (!post.slug || !post.title || !post.date || !post.excerpt) {
      throw Error(`Invalid post data: ${post}`)
    }

    this.#slug = post.slug
    this.#title = post.title
    this.#date = new Date(post.date)
    this.#excerpt = post.excerpt
  }

  toObject() {
    return {
      slug: this.#slug,
      title: this.#title,
      date: this.#date.toLocaleDateString(),
      excerpt: this.#excerpt,
    }
  }
}
