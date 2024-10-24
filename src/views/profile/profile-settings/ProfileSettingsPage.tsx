import * as React from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Tabs } from '@/components/ui'
import { useTabs } from '@/shared/hooks/useTabs'

const ProfileSettingsPage = () => {
  const tabs = useTabs()

  return (
    <Page mb={36} mt={36}>
      <Tabs tabs={tabs} />
    </Page>
  )
}

ProfileSettingsPage.getLayout = getSidebarLayout
export default ProfileSettingsPage
