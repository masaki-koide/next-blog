import { Sdk } from '../../../generated/graphql'
import { Post } from '../../entity/post'

import { PostRepository } from './interface/repository'

export class GqlPostRepository implements PostRepository {
  #sdk: Sdk

  constructor(sdk: Sdk) {
    this.#sdk = sdk
  }

  async getBySlug(slug: string) {
    const { post } = await this.#sdk.PostBySlug({ slug })
    if (!post) {
      throw Error(`Not found post by slug: ${slug}`)
    }

    return new Post(post)
  }
}
