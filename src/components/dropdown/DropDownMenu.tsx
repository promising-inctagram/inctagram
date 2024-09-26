import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as Dropdown from '@radix-ui/react-dropdown-menu'

import s from '@/components/dropdown/Dropdown.module.scss'

type Props = {
  align?: 'center' | 'end' | 'start'
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof Dropdown.Root>

export const DropDownMenu = ({ align = 'start', children, trigger, ...rest }: Props) => {
  return (
    <Dropdown.Root {...rest}>
      <Dropdown.Trigger className={s.trigger}>{trigger}</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align={align} className={s.content}>
          {children}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}

DropDownMenu.displayName = 'DropdownMenu'
