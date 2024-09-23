import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './../Dropdown.module.scss'

const Root = DropdownMenu.Root

type TriggerRef = ElementRef<typeof DropdownMenu.Trigger>
type TriggerProps = ComponentPropsWithoutRef<typeof DropdownMenu.Trigger>
const Trigger = forwardRef<TriggerRef, TriggerProps>(({ ...rest }, ref) => {
  return <DropdownMenu.Trigger className={clsx(s.trigger)} ref={ref} {...rest} />
})

type ContentRef = ElementRef<typeof DropdownMenu.Content>
type ContentProps = {
  align?: 'center' | 'end' | 'start'
} & ComponentPropsWithoutRef<typeof DropdownMenu.Content>

const Content = forwardRef<ContentRef, ContentProps>(({ align = 'start', ...rest }, ref) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content align={align} className={s.content} ref={ref} {...rest} />
    </DropdownMenu.Portal>
  )
})

type ItemRef = ElementRef<typeof DropdownMenu.Item>
type ItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>
const Item = forwardRef<ItemRef, ItemProps>(({ ...rest }, ref) => {
  return <DropdownMenu.Item asChild className={clsx(s.itemIcon)} ref={ref} {...rest} />
})

export { Content, Item, Root, Trigger }
