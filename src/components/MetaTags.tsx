import React from 'react'
import Head from 'next/head'
import { renderMetaTags, SeoMetaTagType } from 'react-datocms'

type Props = {
  metaTags: SeoMetaTagType[]
}

export const MetaTags: React.FC<Props> = ({ metaTags }) => {
  return <Head>{renderMetaTags(metaTags)}</Head>
}
