import { PostBySlugQuery } from '../../generated/graphql'

import { Unserializable } from './common/unserializable'
import { CoverImage, CoverImageDto } from './coverImage'
import { MetaTag, MetaTagDto } from './metaTag'

type PostInput = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: NonNullable<PostBySlugQuery['post']>['coverImage']
  metaTags: NonNullable<PostBySlugQuery['post']>['metaTags']
}

export type PostDto = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: CoverImageDto | null
  metaTags: MetaTagDto[]
}

export class Post implements Unserializable<PostDto> {
  #slug: string

  #title: string

  #date: Date

  #excerpt: string

  #content: string

  #coverImage: CoverImage | null

  #metaTags: MetaTag[]

  constructor(post: PostInput) {
    if (
      !post.slug ||
      !post.title ||
      !post.date ||
      !post.excerpt ||
      !post.content
    ) {
      throw Error(`Invalid post data: ${JSON.stringify(post)}`)
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

    this.#metaTags = post.metaTags.map(metaTag => new MetaTag(metaTag))
  }

  toObject() {
    return {
      slug: this.#slug,
      title: this.#title,
      date: `${this.#date.getFullYear()}/${
        this.#date.getMonth() + 1
      }/${this.#date.getDate()}`,
      excerpt: this.#excerpt,
      content: this.#content,
      coverImage: this.#coverImage?.toObject() ?? null,
      metaTags: this.#metaTags.map(metaTag => metaTag.toObject()),
    }
  }
}
