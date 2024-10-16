import * as React from 'react'
import { useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Tabs } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import DevicesPage from '@/views/profile/profile-settings/devices/ui/Devices'

const tabs = [
  { disabled: false, title: 'General information', value: 'General information' },
  { content: <DevicesPage />, disabled: false, title: 'Devices', value: 'Devices' },
  { disabled: false, title: 'Account Management', value: 'Account Management' },
  { disabled: false, title: 'My payments', value: 'My payments' },
]

const ProfileSettingsPage = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClickCallback = (index: number) => {
    setActiveTab(index)
  }

  return (
    <Page mb={36} mt={36}>
      <Tabs tabClickCallback={index => handleTabClickCallback(index)} tabs={tabs} />
      {tabs[activeTab].content}
    </Page>
  )
}

ProfileSettingsPage.getLayout = getSidebarLayout
export default ProfileSettingsPage
