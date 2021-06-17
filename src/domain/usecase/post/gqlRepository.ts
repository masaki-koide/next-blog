import { sdk } from '../../../graphql/client'
import { Sdk } from '../../../generated/graphql'
import { Post } from '../../entity/post'
import { PostSummary } from '../../entity/postSummary'

import { PostRepository } from './interface/repository'

export class GqlPostRepository implements PostRepository {
  #sdk: Sdk

  constructor() {
    this.#sdk = sdk
  }

  async getBySlug(slug: string) {
    const { post } = await this.#sdk.PostBySlug({ slug })
    if (!post) {
      throw Error(`Not found post by slug: ${slug}`)
    }

    return new Post(post)
  }

  async getSummaries() {
    const { allPosts } = await this.#sdk.PostsPerPage()
    const posts = allPosts.map(post => new PostSummary(post))

    return posts
  }
}
