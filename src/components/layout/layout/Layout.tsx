import { PropsWithChildren, ReactElement } from 'react'

import { Header } from '@/components'
import { Toaster } from '@/components/ui/toast/Toast'
import { useMeQuery } from '@/shared/api/auth/auth.api'
import { NextPage } from 'next'

import s from './Layout.module.scss'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const { data, isError, isLoading, isSuccess } = useMeQuery()
  const isAuth = !isError && !isLoading

  return (
    <>
      <Header isAuth={isSuccess} />
      <main className={s.layout}>{children}</main>
      <Toaster />
    </>
  )
}

export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
