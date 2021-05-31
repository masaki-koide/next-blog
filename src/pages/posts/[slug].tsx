import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Image } from 'react-datocms'

import { sdk } from '../../graphql/client'
import { PostDto } from '../../domain/entity/post'
import { GetPostInteractor } from '../../domain/usecase/post/getPost'
import { GetPostSummariesInteractor } from '../../domain/usecase/post/getPostSummaries'
import { GqlPostRepository } from '../../domain/usecase/post/gqlRepository'
import { markdown2react } from '../../utils/markdown'
import { MetaTags } from '../../components/MetaTags'

type UrlQuery = {
  slug: string
}

type Props = {
  post: PostDto
}

// function isNotNullable<T>(value: T): value is NonNullable<T> {
//   return value !== undefined && value !== null
// }

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
  const interactor = new GetPostSummariesInteractor(new GqlPostRepository(sdk))
  const posts = await interactor.handle()
  const paths = posts.map(post => ({
    params: { slug: post.slug },
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
      throw Error(`Invalid post slug: ${slug}`)
    }

    const interactor = new GetPostInteractor(new GqlPostRepository(sdk))
    const result = await interactor.handle({ slug })

    return {
      props: { post: result },
    }
  }

export default Component
