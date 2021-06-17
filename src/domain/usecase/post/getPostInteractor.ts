import { injectable, inject } from 'tsyringe'

import { injectionTokens } from '../../../di/token'

import { GetPostUsecase } from './interface/usecase'
import { PostRepository } from './interface/repository'

@injectable()
export class GetPostInteractor implements GetPostUsecase {
  constructor(
    @inject(injectionTokens.postRepository)
    private postRepository: PostRepository
  ) {}

  async handle({ slug }: { slug: string }) {
    const post = await this.postRepository.getBySlug(slug)
    return post.toObject()
  }
}
