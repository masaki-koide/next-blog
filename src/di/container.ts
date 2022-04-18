import { container } from 'tsyringe'

import {
  FilePostRepository,
  GetPostInteractor,
  GetPostSummariesInteractor,
  QiitaPostRepository,
} from '../domain/usecase/post'

import { injectionTokens } from './token'

container.register(injectionTokens.postRepository, {
  useClass: FilePostRepository,
})
container.register(injectionTokens.externalPostRepositories, {
  useClass: QiitaPostRepository,
})

const getPostInteractor = container.resolve(GetPostInteractor)
const getPostSummariesInteractor = container.resolve(GetPostSummariesInteractor)

export { getPostInteractor, getPostSummariesInteractor }
