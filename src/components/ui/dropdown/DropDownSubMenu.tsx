import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as Dropdown from '@radix-ui/react-dropdown-menu'

import s from '@/components/ui/dropdown/Dropdown.module.scss'

import { Typography } from '../typography'

type Props = {
  title: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof Dropdown.Sub>

export const DropDownSubMenu = ({ children, title, trigger, ...rest }: Props) => {
  return (
    <Dropdown.Sub {...rest}>
      <Dropdown.SubTrigger className={s.item}>
        {trigger}
        <Typography as={'span'}>{title}</Typography>
      </Dropdown.SubTrigger>
      <Dropdown.Portal>
        <Dropdown.SubContent className={s.content}>{children}</Dropdown.SubContent>
      </Dropdown.Portal>
    </Dropdown.Sub>
  )
}

DropDownSubMenu.displayName = 'DropDownSubMenu'
