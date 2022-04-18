import fs from 'fs'
import os from 'os'
import { join } from 'path'

import glob from 'glob'
import matter from 'gray-matter'

import { Post } from '../../entity/post'
import { PostSummary } from '../../entity/postSummary'

import { PostRepository } from './interface/repository'

function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

export class FilePostRepository implements PostRepository {
  #contentDirectory = join(process.cwd(), 'content')

  // eslint-disable-next-line @typescript-eslint/require-await -- asyncにするメリットがないため無効
  async getBySlug(slug: string) {
    const path = join(this.#contentDirectory, `${slug}.md`)
    const { data, content, excerpt } =
      FilePostRepository.getPostByFilePath(path)

    return new Post({
      slug: data.slug,
      title: data.title,
      date: data.date,
      excerpt,
      content,
      coverImage: null,
      metaTags: [],
    })
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- asyncにするメリットがないため無効
  async getSummaries() {
    const paths = this.getAllPostPaths()
    const posts = paths
      .map(path => {
        const { data, excerpt } = FilePostRepository.getPostByFilePath(path)
        if (process.env.NODE_ENV === 'production' && !data.draft) {
          return null
        }

        return new PostSummary({
          slug: data.slug,
          title: data.title,
          date: data.date,
          excerpt,
        })
      })
      .filter(isNonNullable)

    return posts
  }

  private getAllPostPaths() {
    return glob.sync(join(this.#contentDirectory, '**/*.md'))
  }

  private static getPostByFilePath(path: string) {
    const fileContents = fs.readFileSync(path, 'utf8')
    const { data, content, excerpt } = matter(fileContents, {
      // @ts-expect-error -- ライブラリの型が間違っている
      excerpt: file => {
        // @ts-expect-error -- ライブラリの型が間違っている
        // eslint-disable-next-line
        file.excerpt = file.content.split(os.EOL).slice(0, 1).join('')
      },
    })

    return {
      data,
      content,
      excerpt: excerpt as string,
    }
  }
}
