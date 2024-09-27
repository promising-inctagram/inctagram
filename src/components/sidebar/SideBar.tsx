import { ComponentPropsWithoutRef, ComponentType, ElementRef, forwardRef } from 'react'

import { LogOutOutlineIcon } from '@/components/icons'
import { menuItems } from '@/components/sidebar/menu-items'
import { Typography } from '@/components/typography'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()

  return (
    <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
      <div className={s.group}>
        {menuItems.slice(0, 5).map(({ Icon, OutlineIcon, label, path }, index) => (
          <Item
            Icon={Icon}
            OutlineIcon={OutlineIcon}
            isActive={router.pathname === path}
            key={label + index}
            label={label}
            path={path}
          />
        ))}
      </div>
      <div className={s.group}>
        {menuItems.slice(5).map(({ Icon, OutlineIcon, label, path }, index) => (
          <Item
            Icon={Icon}
            OutlineIcon={OutlineIcon}
            isActive={router.pathname === path}
            key={label + index}
            label={label}
            path={path}
          />
        ))}
      </div>
      <div className={s.group}>
        <Typography as={'button'} className={s.title} variant={'medium_text_14'}>
          <LogOutOutlineIcon className={s.icon} />
          Log Out
        </Typography>
      </div>
    </nav>
  )
})

type ItemProps = {
  Icon: ComponentType<{ className: string }>
  OutlineIcon: ComponentType<{ className: string }>
  isActive: boolean
  label: string
  path: string
}

const Item = ({ Icon, OutlineIcon, isActive, label, path }: ItemProps) => {
  return (
    <Typography
      as={Link}
      className={s.title}
      data-active={isActive}
      href={path}
      variant={'medium_text_14'}
    >
      {isActive ? <Icon className={s.icon} /> : <OutlineIcon className={s.icon} />}
      {label}
    </Typography>
  )
}
