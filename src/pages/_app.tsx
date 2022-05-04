import 'reflect-metadata'
import { AppProps } from 'next/app'
import '../styles/global.css'
import 'highlight.js/styles/github-dark.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
