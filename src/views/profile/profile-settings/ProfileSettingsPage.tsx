import { ReactNode, useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Tabs } from '@/components/ui'
import Devices from '@/views/profile/profile-settings/devices/ui/Devices'
import { useGetProfileSettingsTabs } from '@/views/profile/profile-settings/hooks/useGetProfileSettingsTabs'

type RenderTabs = {
  [key: string]: ReactNode
}

const ProfileSettingsPage = () => {
  const tabs = useGetProfileSettingsTabs()
  const [tab, setTab] = useState<string>('')
  const handleValueChange = (value: string) => {
    setTab(value)
  }

  const renderTabs: RenderTabs = {
    Devices: <Devices />,
  }

  return (
    <Page>
      <Tabs onValueChange={handleValueChange} tabs={tabs} />
      {renderTabs[tab]}
    </Page>
  )
}

ProfileSettingsPage.getLayout = getSidebarLayout
export default ProfileSettingsPage
