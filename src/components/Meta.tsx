import Head from 'next/head'
import { useRouter } from 'next/router'

import { DESCRIPTION, DOMAIN, TITLE } from '../constants'

type Props = {
  title?: string
  description?: string
  type?: 'website' | 'article'
}

export function Meta({
  title,
  description = DESCRIPTION,
  type = 'website',
}: Props) {
  const router = useRouter()
  const url = DOMAIN + router.asPath
  const pageTitle = title ? `${title} | ${TITLE}` : TITLE

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta charSet="utf-8" />

      <link href={url} rel="canonical" />
      <link href="/favicon.ico" rel="icon" />

      <meta content={description} name="description" />
      <meta content={description} property="og:description" />
      <meta content={pageTitle} property="og:title" />
      <meta content={TITLE} property="og:site_name" />
      <meta content={url} property="og:url" />
      <meta content={type} property="og:type" />
      {/* <meta property="og:image" content="画像URL" /> */}

      <meta content="summary_large_image" name="twitter:card" />
      <meta content="@markey_koichan" name="twitter:site" />
    </Head>
  )
}
