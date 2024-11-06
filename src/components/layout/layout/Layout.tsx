import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components'
import { Toaster } from '@/components/ui/toast/Toast'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.layout}>{children}</main>
      <Toaster />
    </>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
