import React, { PropsWithChildren, ReactElement } from 'react'

import { Layout } from '@/widgets/layout/Layout'
import { NextPage } from 'next'

export const AuthLayout: NextPage<PropsWithChildren> = props => {
  const { children } = props

  return <Layout>{children}</Layout>
}

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}
