import { ComponentPropsWithoutRef, useState } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './Tabs.module.scss'

export type TabType = {
  disabled?: boolean
  title: string
  /** A unique value that associates the trigger with a content. */
  value: string
}

type Props = {
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof RadixTabs.Root>

export const Tabs = (props: Props) => {
  const { tabs, ...rest } = props

  const [activeTab, setActiveTab] = useState('tab1')
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <RadixTabs.Root className={s.root} onValueChange={handleTabChange} value={activeTab} {...rest}>
      <RadixTabs.List className={s.list} loop>
        {tabs.map((tab, index) => (
          <RadixTabs.Trigger
            className={clsx(s.trigger, index === 0 && activeTab === 'tab1' && s.highlight)}
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
