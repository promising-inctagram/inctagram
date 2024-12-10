import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components'
import { Toaster } from '@/components/ui/toast/Toast'
import { AuthProvider } from '@/shared/contexts'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <Header />
      <main className={s.layout}>{children}</main>
      <Toaster />
    </AuthProvider>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
