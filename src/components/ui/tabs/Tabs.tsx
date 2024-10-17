import { ComponentPropsWithoutRef, useState } from 'react'

import { Button, Typography } from '@/components/ui'
import * as RadixTabs from '@radix-ui/react-tabs'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './Tabs.module.scss'

export type TabType = {
  disabled?: boolean
  path: string
  title: string
  value: string
}

type Props = {
  defaultValue?: 'Account Management' | 'Devices' | 'General information' | 'My payments'
  onChange?: (value: string) => void
  tabs: TabType[]
  value?: string
} & ComponentPropsWithoutRef<typeof RadixTabs.Root>

export const Tabs = ({ defaultValue, onChange, tabs, value, ...rest }: Props) => {
  return (
    <RadixTabs.Root defaultValue={defaultValue} onValueChange={onChange} value={value} {...rest}>
      <RadixTabs.List className={s.list} loop>
        {tabs.map(tab => (
          <RadixTabs.Trigger
            asChild
            className={clsx(s.trigger)}
            disabled={tab.disabled}
            key={tab.value}
            value={tab.value}
          >
            <Button as={Link} href={tab.path} variant={''}>
              {tab.title}
            </Button>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  )
}
