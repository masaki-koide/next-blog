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
import { PostBySlugQuery } from '../../generated/graphql'

type UrlQuery = {
  slug: string
}

type Props = {
  post: PostBySlugQuery
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

const Post: NextPage<Props> = ({ post }) => {
  console.log(post)
  const imageData = post?.post?.coverImage?.responsiveImage

  return (
    <div>
      {imageData && (
        <div>
          {/* FIXME:CodegenのMaybeのせいで型がHoge | null | undefinedになってしまう */}
          {/* @ts-ignore */}
          <Image data={imageData} />
        </div>
      )}
      <div>{markdown2react(post?.post?.content ?? '')}</div>
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
  const result = await sdk.PostBySlug({ slug })

  return {
    props: { post: result },
  }
}

export default Post
