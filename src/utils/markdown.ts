import React from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'
import rehypeHighlight from 'rehype-highlight'

import { Anchor } from '../components/Anchor'
import { H1, H2, H3 } from '../components/Heading'
import { UnorderedList } from '../components/UnorderedList'
import { ListItem } from '../components/ListItem'
import { Paragraph } from '../components/Paragraph'
import { Blockquote } from '../components/Blockquote'
import { Img } from '../components/Img'

const proceccor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- rehype-reactの型が曖昧なため
  // @ts-expect-error
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      a: Anchor,
      h1: H1,
      h2: H2,
      h3: H3,
      ul: UnorderedList,
      li: ListItem,
      p: Paragraph,
      blockquote: Blockquote,
      img: Img,
    },
  })

export const markdown2react = (markdown: string) => {
  const contents = proceccor.processSync(markdown)
  return contents.result as React.ReactElement
}
