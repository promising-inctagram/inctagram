import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './Tabs.module.scss'

const TabsRoot = forwardRef<
  ElementRef<typeof RadixTabs.Root>,
  ComponentPropsWithoutRef<typeof RadixTabs.Root>
>(({ className, ...props }, ref) => {
  return <RadixTabs.Root className={clsx(s.root, className)} ref={ref} {...props} />
})

const TabsList = forwardRef<
  ElementRef<typeof RadixTabs.List>,
  ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => {
  return <RadixTabs.List className={clsx(s.list, className)} ref={ref} {...props} />
})

const TabsTrigger = forwardRef<
  ElementRef<typeof RadixTabs.Trigger>,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => {
  return <RadixTabs.Trigger className={clsx(s.trigger, className)} ref={ref} {...props} />
})

const TabsContent = forwardRef<
  ElementRef<typeof RadixTabs.Content>,
  ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => {
  return <RadixTabs.Content className={clsx(s.content, className)} ref={ref} {...props} />
})

export { TabsContent, TabsList, TabsRoot, TabsTrigger }

