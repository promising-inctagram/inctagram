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

  const [isFirstItemHighlighted, setIsFirstItemHighlighted] = useState(true)

  const handleItemClick = (index: number) => {
    if (index !== 0) {
      setIsFirstItemHighlighted(false)
    }
  }

  return (
    <RadixTabs.Root className={s.root} {...rest}>
      <RadixTabs.List className={s.list}>
        {tabs.map((tab, index) => (
          <RadixTabs.Trigger
            className={clsx(s.trigger, index === 0 && isFirstItemHighlighted && s.highlight)}
            disabled={tab.disabled}
            key={tab.value}
            onClick={() => handleItemClick(index)}
            value={tab.value}
          >
            {tab.title}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}
