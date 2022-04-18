import { injectable, inject, injectAll } from 'tsyringe'

import { injectionTokens } from '../../../di/token'

import { GetPostSummariesUsecase } from './interface/usecase'
import { PostRepository } from './interface/repository'

@injectable()
export class GetPostSummariesInteractor implements GetPostSummariesUsecase {
  constructor(
    @inject(injectionTokens.postRepository)
    private postRepository: PostRepository,
    @injectAll(injectionTokens.externalPostRepositories)
    private externalPostRepositories: PostRepository[]
  ) {}

  async handle() {
    const posts = await Promise.all([
      this.postRepository.getSummaries(),
      ...this.externalPostRepositories.map(repo => repo.getSummaries()),
    ])

    return posts
      .flat()
      .map(post => post.toObject())
      .sort((a, b) => (a.date > b.date ? -1 : 1))
  }
}
