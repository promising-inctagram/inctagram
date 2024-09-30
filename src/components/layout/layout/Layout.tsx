import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.layout}>{children}</main>
    </>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
