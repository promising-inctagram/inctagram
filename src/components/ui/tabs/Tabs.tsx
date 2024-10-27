import { ComponentPropsWithoutRef, FormEvent, FormEventHandler } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './Tabs.module.scss'

export type TabType = {
  disabled?: boolean
  title: string
  value: string
}

type Props = {
  /*onChange: (value: string) => void*/
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof RadixTabs.Root>

export const Tabs = ({ onChange, onValueChange, tabs, value, ...rest }: Props) => {
  /*const [activeTab, setActiveTab] = useState(tabs[0].value || '')*/
  const handleTabChange = (value: string) => {
    /*setActiveTab(value)*/
    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <RadixTabs.Root onValueChange={handleTabChange} value={/*activeTab*/ value} {...rest}>
      <RadixTabs.List className={s.list} loop>
        {tabs.map((tab, index) => (
          <RadixTabs.Trigger
            className={clsx(
              s.trigger,
              /*index === 0 && activeTab*/ value === tab.value && s.highlight
            )}
            disabled={tab.disabled}
            key={tab.value}
            /*onChange={handleTabChange}*/
            value={tab.value}
          >
            {tab.title}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}
