import type { AppProps } from 'next/app'

import { useLoader } from '@/shared/hooks'

import '@/styles/index.scss'
import '@/styles/nprogress.css'

export default function App({ Component, pageProps }: AppProps) {
  useLoader()

  return <Component {...pageProps} />
}
