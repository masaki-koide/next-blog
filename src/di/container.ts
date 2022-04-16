import { container } from 'tsyringe'

import {
  FilePostRepository,
  GetPostInteractor,
  GetPostSummariesInteractor,
} from '../domain/usecase/post'

import { injectionTokens } from './token'

container.register(injectionTokens.postRepository, {
  useClass: FilePostRepository,
})

const getPostInteractor = container.resolve(GetPostInteractor)
const getPostSummariesInteractor = container.resolve(GetPostSummariesInteractor)

export { getPostInteractor, getPostSummariesInteractor }
