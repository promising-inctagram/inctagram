import * as React from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Tabs } from '@/components/ui'
import { useTabs } from '@/shared/hooks/useTabs'

const General = () => {
  const tabs = useTabs()

  return (
    <Page mb={36} mt={36}>
      <Tabs defaultValue={'General information'} tabs={tabs} />
    </Page>
  )
}

General.getLayout = getSidebarLayout
export default General
