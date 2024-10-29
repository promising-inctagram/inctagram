import { ComponentPropsWithoutRef } from 'react'

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

export const Tabs = ({ onChange, onValueChange, tabs, value, ...rest }: Props) => {
  const handleTabChange = (value: string) => {
    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <RadixTabs.Root onValueChange={handleTabChange} value={value} {...rest}>
      <RadixTabs.List className={s.list} loop>
        {tabs.map(tab => (
          <RadixTabs.Trigger
            className={clsx(s.trigger, value === tab.value && s.highlight)}
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
