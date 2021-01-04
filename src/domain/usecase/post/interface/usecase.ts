import { PostDto } from '../../../entity/post'
import { PostSummaryDto } from '../../../entity/postSummary'

type GetPostInputData = {
  slug: string
}
export interface GetPostUsecase {
  handle(request: GetPostInputData): Promise<PostDto>
}

export interface GetPostSummariesUsecase {
  handle(): Promise<PostSummaryDto[]>
}
