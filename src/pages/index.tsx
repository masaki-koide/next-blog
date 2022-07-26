import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import { getPostSummariesInteractor } from '../di/container'
import { PostSummaryDto } from '../domain/entity/postSummary'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { ExternalLink } from '../components/icons'
import { generateFeed } from '../utils/feed'
import { Tag } from '../components/Tag'

type Props = {
  posts: PostSummaryDto[]
  tags: string[]
}

const Home: NextPage<Props> = ({ posts, tags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  return (
    <>
      <Meta />
      <Layout>
        <ul className="leading-8">
          <details>
            <summary>Tags</summary>
            {tags.map(tag => (
              <li className="inline-block mr-1 list-none" key={tag}>
                <Tag
                  onClick={selected => {
                    setSelectedTags(prev =>
                      selected ? [...prev, tag] : prev.filter(e => e !== tag)
                    )
                  }}
                >
                  {tag}
                </Tag>
              </li>
            ))}
          </details>
        </ul>
        <ul>
          {posts.map(post => {
            const agg = [...selectedTags, ...post.tags]
            const set = new Set(agg)
            // 重複がある（この投稿のtagが選択されている）なら要素の数が違うことを利用
            if (selectedTags.length !== 0 && agg.length === set.size) {
              return null
            }

            return (
              <li
                className="border border-slate-300 rounded-3xl hover:bg-slate-50 mt-8"
                key={post.slug}
              >
                <Link href={post.url ?? `/posts/${post.slug}`}>
                  {/* eslint-disable-next-line react/jsx-no-target-blank -- 条件分岐で_blankとnorefererをセットにしている */}
                  <a
                    className="block px-6 py-12"
                    href={post.url ?? `/posts/${post.slug}`}
                    rel={post.externalSite ? 'noopener noreferrer' : ''}
                    target={post.externalSite ? '_blank' : '_self'}
                    title={post.title}
                  >
                    <div className="flex justify-between relative">
                      {post.externalSite && (
                        <div className="absolute mt-0.5">
                          <ExternalLink height={24} width={24} />
                        </div>
                      )}
                      <div
                        className={`text-xl font-bold text-ellipsis whitespace-nowrap overflow-hidden ${
                          post.externalSite ? 'pl-8' : ''
                        }`}
                      >
                        {post.title}
                      </div>
                      <div className="text-slate-400 text-sm">{post.date}</div>
                    </div>
                    <div className="mt-4">{post.excerpt}</div>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPostSummariesInteractor.handle()
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)))

  generateFeed(posts)

  return {
    props: { posts, tags },
  }
}

export default Home
