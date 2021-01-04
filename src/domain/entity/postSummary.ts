import { PostsPerPageQuery } from '../../generated/graphql'

export class PostSummary {
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

  getSlug() {
    return this.#slug
  }

  getTitle() {
    return this.#title
  }

  getDate() {
    return this.#date.toLocaleDateString()
  }

  getExcerpt() {
    return this.#excerpt
  }
}
