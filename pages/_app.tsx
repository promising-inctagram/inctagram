import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { wrapper } from '@/services/store'
import { useLoader } from '@/shared/hooks'
import { NextPage } from 'next'

import '@/styles/index.scss'

export type NextPageWithLayout<P = {}> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)
  const { props, store } = wrapper.useWrappedStore(rest)

  return getLayout(
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}
