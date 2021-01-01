import { GetPostUsecase } from './interface/usecase'
import { PostRepository } from './interface/repository'

export class GetPostInteractor implements GetPostUsecase {
  #postRepository: PostRepository

  constructor(repository: PostRepository) {
    this.#postRepository = repository
  }

  async handle({ slug }: { slug: string }) {
    const post = await this.#postRepository.getBySlug(slug)
    return post
  }
}
