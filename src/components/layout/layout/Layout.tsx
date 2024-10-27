import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components'
import { Toaster } from '@/components/ui/toast/Toast'
import { useMeQuery } from '@/shared/api/auth/auth.api'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError && !isLoading

  return (
    <>
      <Header isAuth={isAuth} />
      <main className={s.layout}>{children}</main>
      <Toaster />
    </>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
