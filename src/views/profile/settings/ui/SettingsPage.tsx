import { useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import Devices from '@/views/devices/ui/Devices'
import { GeneralInformation } from '@/views/profile/settings/ui/tabs/general/General'

import s from './SettingsPage.module.scss'

function SettingsPage() {
  const { t } = useTranslation()
  const { accountManagement, devices, generalInformation, myPayments } = t.profileSettingPage.tabs
  const [selectedTab, setSelectedTab] = useState('general')

  return (
    <Page className={s.container}>
      <TabsRoot onValueChange={setSelectedTab} value={selectedTab}>
        <TabsList>
          <TabsTrigger value={'general'}>{generalInformation}</TabsTrigger>
          <TabsTrigger value={'devices'}>{devices}</TabsTrigger>
          <TabsTrigger value={'account'}>{accountManagement}</TabsTrigger>
          <TabsTrigger value={'payments'}>{myPayments}</TabsTrigger>
        </TabsList>

        <TabsContent value={'general'}>
          <GeneralInformation />
        </TabsContent>
        <TabsContent value={'devices'}>
          <Devices />
        </TabsContent>
        <TabsContent value={'account'}>Content for Account Management</TabsContent>
        <TabsContent value={'payments'}>Content for My Payments</TabsContent>
      </TabsRoot>
    </Page>
  )
}
SettingsPage.getLayout = getSidebarLayout
export default SettingsPage
