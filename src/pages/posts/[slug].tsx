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

type UrlQuery = {
  slug: string
}

type Props = {
  post: PostDto
}

const Component: NextPage<Props> = ({ post }) => {
  const imageData = post.coverImage?.responsiveImage

  return (
    <div>
      <MetaTags metaTags={post.metaTags} />
      {imageData && (
        <div>
          <Image data={imageData} />
        </div>
      )}
      <div>{markdown2react(post.content)}</div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const posts = await getPostSummariesInteractor.handle()
  const paths = posts.map(({ slug }) => ({
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
