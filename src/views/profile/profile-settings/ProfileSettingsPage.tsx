import { useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Tabs } from '@/components/ui'
import Devices from '@/views/profile/profile-settings/devices/ui/Devices'
import { useTabs } from '@/views/profile/profile-settings/hooks/useTabs'

const ProfileSettingsPage = () => {
  const tabs = useTabs()
  const [tab, setTab] = useState('')
  const handleValueChange = (value: string) => {
    setTab(value)
  }

  return (
    <Page>
      <Tabs onValueChange={handleValueChange} tabs={tabs} />
      {tab === 'General information' && 'General information'}
      {tab === 'Devices' && <Devices />}
    </Page>
  )
}

ProfileSettingsPage.getLayout = getSidebarLayout
export default ProfileSettingsPage
