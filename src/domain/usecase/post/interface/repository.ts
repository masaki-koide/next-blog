import { Post } from '../../../entity/post'
import { PostSummary } from '../../../entity/postSummary'

export interface PostRepository {
  getBySlug(slug: string): Promise<Post>
  getSummaries(): Promise<PostSummary[]>
}
