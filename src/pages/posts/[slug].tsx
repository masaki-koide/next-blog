import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Image } from 'react-datocms'

import { PostDto } from '../../domain/entity/post'
import {
  getPostInteractor,
  getPostSummariesInteractor,
} from '../../di/container'
import { markdown2react } from '../../utils/markdown'
import { MetaTags } from '../../components/MetaTags'
import { Layout } from '../../components/Layout'
import { Meta } from '../../components/Meta'

type UrlQuery = {
  slug: string
}

type Props = {
  post: PostDto
}

const Component: NextPage<Props> = ({ post }) => {
  const imageData = post.coverImage?.responsiveImage

  return (
    <>
      <Meta description={post.excerpt} title={post.title} type="article" />
      <Layout>
        <h1 className="mb-4 font-bold text-3xl text-center tracking-wide">
          {post.title}
        </h1>
        <div className="mb-4 text-slate-400 text-center tracking-wide">
          {post.date}
        </div>
        <MetaTags metaTags={post.metaTags} />
        {imageData && (
          <div>
            <Image data={imageData} />
          </div>
        )}
        <div>{markdown2react(post.content)}</div>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const posts = await getPostSummariesInteractor.handle()
  const paths = posts
    .filter(post => !post.externalSite)
    .map(({ slug }) => ({
      params: { slug },
    }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, UrlQuery> =
  async context => {
    const slug = context.params?.slug
    if (!slug) {
      throw Error(`Post slug is not found`)
    }

    const result = await getPostInteractor.handle({ slug })

    return {
      props: { post: result },
    }
  }

export default Component
