import { PropsWithChildren, ReactElement, ReactNode, useState } from 'react'

import { Page, SidebarLayout } from '@/components'
import { Tabs } from '@/components/ui'
import { useTabs } from '@/views/profile/profile-settings/hooks/useTabs'
import { NextPage } from 'next'

type Props = {
  children: ReactNode
}
export const TabsLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const tabs = useTabs()
  const [tab, setTab] = useState('')
  const handle = (value: string) => {
    console.log(value)
    setTab(value)
  }

  return (
    <SidebarLayout>
      <Page>
        <Tabs defaultValue={tab} onValueChange={handle} tabs={tabs} />
        {children}
        {/*{Children.map(children, child => {
          if (isValidElement(child)) {
            return cloneElement(child, { tab })
          }

          return child
        })}*/}
      </Page>
    </SidebarLayout>
  )
}

export function getTabsLayout(page: ReactElement) {
  return <TabsLayout>{page}</TabsLayout>
}
