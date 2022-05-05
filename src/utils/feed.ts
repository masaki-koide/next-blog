import fs from 'fs'

import { Feed } from 'feed'

import { PostSummaryDto } from '../domain/entity/postSummary'
import { DESCRIPTION, DOMAIN, TITLE } from '../constants'

const feedDir = './public/feed'
const atomPath = `${feedDir}/atom.xml`
const rssPath = `${feedDir}/rss.xml`

const author = {
  name: 'markey',
  link: 'https://twitter.com/markey_koichan',
}

export function generateFeed(posts: PostSummaryDto[]) {
  const feed = new Feed({
    title: TITLE,
    description: DESCRIPTION,
    id: DOMAIN,
    link: DOMAIN,
    language: 'ja',
    // XMLと`&`の相性が悪いため最小限のクエリ
    image: `https://og-image.markey-dev.com/${encodeURIComponent(
      TITLE
    )}.jpeg?md=1`,
    favicon: `${DOMAIN}/favicon.ico`,
    copyright: 'All rights reserved 2022, markey',
    feedLinks: {
      atom: `${DOMAIN}/feed/atom.xml`,
      rss2: `${DOMAIN}/feed/rss.xml`,
    },
    author,
  })

  posts.forEach(post => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- externalSiteがtrueの時はurlが存在する
    const url = post.externalSite ? post.url! : `${DOMAIN}/posts/${post.slug}`

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: `<a href="${url}">続きを読む</a>`,
      author: [author],
      date: new Date(post.date),
      // XMLと`&`の相性が悪いため最小限のクエリ
      image: `https://og-image.markey-dev.com/${encodeURIComponent(
        post.title
      )}.jpeg?md=1`,
    })
  })

  fs.mkdirSync(feedDir, { recursive: true })
  fs.writeFileSync(atomPath, feed.atom1())
  fs.writeFileSync(rssPath, feed.rss2())
}
