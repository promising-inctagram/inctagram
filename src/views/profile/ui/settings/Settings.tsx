import { ReactNode, useState } from 'react'

import { TabType, Tabs } from '@/components/ui'
import { GeneralInformation } from '@/views/profile/ui/settings/tabs/general/General'

import s from './Settings.module.scss'
const GeneralInfo = () => <GeneralInformation />
const Devices = () => <div>Devices Content</div>
const AccountManagement = () => <div>Account Management Content</div>
const MyPayments = () => <div>My Payments Content</div>

export const Settings = () => {
  const [selectedTab, setSelectedTab] = useState('tab1')

  // Данные табов
  const tabs: TabType[] = [
    { title: 'General information', value: 'tab1' },
    { title: 'Devices', value: 'tab2' },
    { title: 'Account Management', value: 'tab3' },
    { title: 'My payments', value: 'tab4' },
  ]

  // Объект для сопоставления табов с компонентами
  const contentMap: Record<string, ReactNode> = {
    tab1: <GeneralInfo />,
    tab2: <Devices />,
    tab3: <AccountManagement />,
    tab4: <MyPayments />,
  }

  return (
    <div>
      <Tabs onValueChange={setSelectedTab} tabs={tabs} value={selectedTab} />
      <div
        style={{
          marginTop: '20px',
        }}
      >
        {contentMap[selectedTab] ?? <div>Content not found</div>}
      </div>
    </div>
  )
}
