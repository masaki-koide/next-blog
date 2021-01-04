import { GetPostSummariesUsecase } from './interface/usecase'
import { PostRepository } from './interface/repository'

export class GetPostSummariesInteractor implements GetPostSummariesUsecase {
  #postRepository: PostRepository

  constructor(repository: PostRepository) {
    this.#postRepository = repository
  }

  async handle() {
    const posts = await this.#postRepository.getSummaries()
    return posts.map(post => post.toObject())
  }
}
