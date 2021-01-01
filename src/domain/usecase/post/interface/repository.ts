import { Post } from '../../../entity/post'

export interface PostRepository {
  getBySlug(slug: string): Promise<Post>
}
