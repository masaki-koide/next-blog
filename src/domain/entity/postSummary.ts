import { Unserializable } from './common/unserializable'

type PostSummaryInput = {
  slug: string
  title: string
  date: string
  excerpt: string
} & (
  | {
      externalSite: true
      url: string
    }
  | {
      externalSite?: false
    }
)

export type PostSummaryDto = {
  slug: string
  title: string
  date: string
  excerpt: string
  externalSite: boolean
  url: string | null
}
export class PostSummary implements Unserializable<PostSummaryDto> {
  #slug: string

  #title: string

  #date: Date

  #excerpt: string

  #externalSite: boolean

  #url: string | null

  constructor(post: PostSummaryInput) {
    if (!post.slug || !post.title || !post.date || !post.excerpt) {
      throw Error(`Invalid post data: ${JSON.stringify(post)}`)
    }

    this.#slug = post.slug
    this.#title = post.title
    this.#date = new Date(post.date)
    this.#excerpt = post.excerpt
    this.#externalSite = post.externalSite ?? false
    this.#url = post.externalSite ? post.url : null
  }

  toObject() {
    return {
      slug: this.#slug,
      title: this.#title,
      date: `${this.#date.getFullYear()}/${
        this.#date.getMonth() + 1
      }/${this.#date.getDate()}`,
      excerpt: this.#excerpt,
      externalSite: this.#externalSite,
      url: this.#url,
    }
  }
}
