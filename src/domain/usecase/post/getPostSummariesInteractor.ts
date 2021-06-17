import { injectable, inject } from 'tsyringe'

import { injectionTokens } from '../../../di/token'

import { GetPostSummariesUsecase } from './interface/usecase'
import { PostRepository } from './interface/repository'

@injectable()
export class GetPostSummariesInteractor implements GetPostSummariesUsecase {
  constructor(
    @inject(injectionTokens.postRepository)
    private postRepository: PostRepository
  ) {}

  async handle() {
    const posts = await this.postRepository.getSummaries()
    return posts.map(post => post.toObject())
  }
}
