import { ReactNode, useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { TabType, Tabs } from '@/components/ui'
import { GeneralInformation } from '@/views/settings/ui/tabs/general/General'

const Devices = () => <div>Devices Content</div>
const AccountManagement = () => <div>Account Management Content</div>
const MyPayments = () => <div>My Payments Content</div>

import s from './SettingsPage.module.scss'

function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState('tab1')

  const tabs: TabType[] = [
    { title: 'General information', value: 'tab1' },
    { title: 'Devices', value: 'tab2' },
    { title: 'Account Management', value: 'tab3' },
    { title: 'My payments', value: 'tab4' },
  ]

  const contentMap: Record<string, ReactNode> = {
    tab1: <GeneralInformation />,
    tab2: <Devices />,
    tab3: <AccountManagement />,
    tab4: <MyPayments />,
  }

  return (
    <Page className={s.container}>
      <Tabs onValueChange={setSelectedTab} tabs={tabs} value={selectedTab} />
      {contentMap[selectedTab] ?? <div>Content not found</div>}
    </Page>
  )
}
SettingsPage.getLayout = getSidebarLayout
export default SettingsPage
