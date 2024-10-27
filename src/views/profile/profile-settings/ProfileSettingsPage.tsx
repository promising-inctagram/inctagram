import * as React from 'react'
import { useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { getTabsLayout } from '@/components/layout/tabs-layout/TabsLayout'
import { Tabs } from '@/components/ui'
import Devices from '@/views/profile/profile-settings/devices/ui/Devices'
import { useTabs } from '@/views/profile/profile-settings/hooks/useTabs'

type ProfileSettingsPageProps = {
  tab: string
}
const ProfileSettingsPage = () => {
  const tabs = useTabs()
  const [tab, setTab] = useState('')
  const handle = (value: string) => {
    console.log(value)
    setTab(value)
  }

  return (
    <Page>
      <Tabs defaultValue={tab} onValueChange={handle} tabs={tabs} />
      {tab === 'General information' && 'General information'}
      {tab === 'Devices' && <Devices />}
    </Page>
  )
}

/*ProfileSettingsPage.getLayout = getTabsLayout
export default ProfileSettingsPage*/
ProfileSettingsPage.getLayout = getSidebarLayout
export default ProfileSettingsPage
