import { Post } from '../../../entity/post'
import { PostSummary } from '../../../entity/postSummary'

type GetPostInputData = {
  slug: string
}
export interface GetPostUsecase {
  handle(request: GetPostInputData): Promise<Post>
}

export interface GetPostSummariesUsecase {
  handle(): Promise<PostSummary[]>
}
