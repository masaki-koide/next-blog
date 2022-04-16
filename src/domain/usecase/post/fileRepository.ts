import fs from 'fs'
import { join } from 'path'

import glob from 'glob'
import matter from 'gray-matter'

import { Post } from '../../entity/post'
import { PostSummary } from '../../entity/postSummary'

import { PostRepository } from './interface/repository'

export class FilePostRepository implements PostRepository {
  private contentDirectory = join(process.cwd(), 'content')

  // eslint-disable-next-line @typescript-eslint/require-await -- asyncにするメリットがないため無効
  async getBySlug(slug: string) {
    const path = join(this.contentDirectory, `${slug}.md`)
    const { data, content, excerpt } =
      FilePostRepository.getPostByFilePath(path)

    return new Post({
      id: data.slug,
      slug: data.slug,
      title: data.title,
      date: new Date(data.date),
      excerpt,
      content,
      metaTags: [],
    })
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- asyncにするメリットがないため無効
  async getSummaries() {
    const paths = this.getAllPostPaths()
    const posts = paths.map(path => {
      const { data, excerpt } = FilePostRepository.getPostByFilePath(path)
      return new PostSummary({
        id: data.slug,
        slug: data.slug,
        title: data.title,
        date: new Date(data.date),
        excerpt,
      })
    })

    return posts
  }

  private getAllPostPaths() {
    return glob.sync(join(this.contentDirectory, '**/*.md'))
  }

  private static getPostByFilePath(path: string) {
    const fileContents = fs.readFileSync(path, 'utf8')
    const { data, content, excerpt } = matter(fileContents, { excerpt: true })

    return {
      data,
      content,
      excerpt: excerpt as string,
    }
  }
}
