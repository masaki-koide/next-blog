import { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'

import { getPostSummariesInteractor } from '../di/container'
import { PostSummaryDto } from '../domain/entity/postSummary'
import { Layout } from '../components/Layout'
import { Meta } from '../components/Meta'
import { ExternalLink } from '../components/icons'

type Props = {
  posts: PostSummaryDto[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Meta />
      <Layout>
        <ul>
          {posts.map(post => (
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
          ))}
        </ul>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPostSummariesInteractor.handle()

  return {
    props: { posts },
  }
}

export default Home
