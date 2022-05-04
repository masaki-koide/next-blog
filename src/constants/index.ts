import { SVGProps } from 'react'

import { GithubBrands, TwitterBrands } from '../components/icons'

export const TITLE = 'MARKEY-DEV'
export const DESCRIPTION = 'テックだったりテックじゃなかったりするブログ'
export const DOMAIN = 'https://markey-dev.com'
export const SNS_ICONS: Record<
  string,
  { url: string; icon: (props: SVGProps<SVGSVGElement>) => JSX.Element }
> = {
  github: {
    url: 'https://github.com/masaki-koide',
    icon: GithubBrands,
  },
  twitter: {
    url: 'https://twitter.com/markey_koichan',
    icon: TwitterBrands,
  },
} as const
