import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'
import { Image } from 'react-datocms'

import { sdk } from '../../graphql/client'
import { Post } from '../../domain/entity/post'
import { GetPostInteractor } from '../../domain/usecase/post/getPost'
import { GqlPostRepository } from '../../domain/usecase/post/gqlRepository'

type UrlQuery = {
  slug: string
}

type Props = {
  post: Post
}

function isNotNullable<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

const proceccor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeReact, { createElement: React.createElement })

const markdown2react = (markdown: string) => {
  const contents = proceccor.processSync(markdown)
  return contents.result as React.ReactElement
}

const Component: NextPage<Props> = ({ post }) => {
  const imageData = post.getCoverImage()?.getResponsiveImage()

  return (
    <div>
      {imageData && (
        <div>
          <Image data={imageData} />
        </div>
      )}
      <div>{markdown2react(post.getContent())}</div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const result = await sdk.AllPostsSlug()
  const allSlug = result.allPosts.map(post => post.slug).filter(isNotNullable)
  const paths = allSlug.map(slug => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  Props,
  UrlQuery
> = async context => {
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
