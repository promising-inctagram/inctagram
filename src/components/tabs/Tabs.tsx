import { ComponentPropsWithoutRef } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

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
  const { className, tabs, ...rest } = props

  return (
    <RadixTabs.Root {...rest}>
      <RadixTabs.List>
        {tabs.map(tab => (
          <RadixTabs.Trigger disabled={tab.disabled} key={tab.value} value={tab.value}>
            {tab.title}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}
