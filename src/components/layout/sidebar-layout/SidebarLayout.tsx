import { PropsWithChildren, ReactElement } from 'react'

import { SideBar } from '@/components'
import { Layout } from '@/components/layout'
import { NextPage } from 'next'

export const SidebarLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Layout>
      <SideBar />
      {children}
    </Layout>
  )
}

export function getSidebarLayout(page: ReactElement) {
  return <SidebarLayout>{page}</SidebarLayout>
}
