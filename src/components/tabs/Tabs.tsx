import { ComponentPropsWithoutRef, useState } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './Tabs.module.scss'

export type TabType = {
  disabled?: boolean
  title: string
  value: string
}

type Props = {
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof RadixTabs.Root>

export const Tabs = ({ tabs, ...rest }: Props) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value || '')
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <RadixTabs.Root className={s.root} onValueChange={handleTabChange} value={activeTab} {...rest}>
      <RadixTabs.List className={s.list} loop>
        {tabs.map((tab, index) => (
          <RadixTabs.Trigger
            className={clsx(s.trigger, index === 0 && activeTab === tab.value && s.highlight)}
            disabled={tab.disabled}
            key={tab.value}
            value={tab.value}
          >
            {tab.title}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}
