import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

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

const Post: NextPage<Props> = ({ post }) => {
  console.log(post)
  return <div>{post.post?.title}</div>
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
