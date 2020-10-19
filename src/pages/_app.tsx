import { AppProps } from 'next/app'
import 'normalize.css'
import 'highlight.js/styles/github.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default MyApp
