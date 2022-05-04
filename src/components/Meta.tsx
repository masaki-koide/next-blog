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
  const encodedOgImageText = encodeURIComponent(title ?? TITLE)
  const ogImageUrl = `https://og-image.markey-dev.com/${encodedOgImageText}.jpeg?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F34389937`

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
      <meta content={ogImageUrl} property="og:image" />

      <meta content="summary_large_image" name="twitter:card" />
      <meta content="@markey_koichan" name="twitter:site" />
    </Head>
  )
}
