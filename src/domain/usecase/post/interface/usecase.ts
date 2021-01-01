import { Post } from '../../../entity/post'

type GetPostInputData = {
  slug: string
}

export interface GetPostUsecase {
  handle(request: GetPostInputData): Promise<Post>
}
