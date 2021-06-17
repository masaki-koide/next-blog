import React from 'react'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'

const proceccor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeReact, { createElement: React.createElement })

export const markdown2react = (markdown: string) => {
  const contents = proceccor.processSync(markdown)
  return contents.result as React.ReactElement
}
