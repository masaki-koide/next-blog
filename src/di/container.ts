import { container } from 'tsyringe'

import {
  GqlPostRepository,
  GetPostInteractor,
  GetPostSummariesInteractor,
} from '../domain/usecase/post'

import { injectionTokens } from './token'

container.register(injectionTokens.postRepository, {
  useClass: GqlPostRepository,
})

const getPostInteractor = container.resolve(GetPostInteractor)
const getPostSummariesInteractor = container.resolve(GetPostSummariesInteractor)

export { getPostInteractor, getPostSummariesInteractor }
