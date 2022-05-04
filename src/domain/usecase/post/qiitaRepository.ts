import { QiitaAPIV2JSONSchema } from '../../../generated/qiita'
import { Post } from '../../entity/post'
import { PostSummary } from '../../entity/postSummary'

import { PostRepository } from './interface/repository'

const wrap = <T>(task: Promise<Response>): Promise<T> => {
  return new Promise((resolve, reject) => {
    task
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(json => {
              resolve(json)
            })
            .catch(error => {
              reject(error)
            })
        } else {
          reject(response)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

const fetcher = <T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  return wrap<T>(fetch(input, init))
}

export class QiitaPostRepository implements PostRepository {
  #baseUrl = 'https://qiita.com/api/v2'

  // eslint-disable-next-line -- リンク先に遷移させるだけなのでdummyの実装
  async getBySlug(slug: string) {
    return new Post({
      slug,
      title: 'dummy',
      date: 'dummy',
      excerpt: 'dummy',
      content: 'dummy',
      coverImage: null,
      metaTags: [],
    })
  }

  async getSummaries() {
    const items = await fetcher<QiitaAPIV2JSONSchema['item'][]>(
      `${this.#baseUrl}/authenticated_user/items`,
      {
        headers: {
          Authorization: `Bearer ${process.env.QIITA_API_TOKEN ?? ''}`,
        },
      }
    )
    const posts = items.map(
      item =>
        new PostSummary({
          slug: item.id,
          title: item.title,
          date: item.created_at,
          excerpt: `${item.body.slice(0, 50)}...`,
          externalSite: true,
          url: item.url,
        })
    )

    return posts
  }
}
