import { ComponentPropsWithoutRef, ComponentType, ElementRef, forwardRef } from 'react'

import { menuItems } from '@/components/sidebar/menu-items'
import { Typography } from '@/components/ui'
import { LogOutOutlineIcon } from '@/components/ui/icons'
import { Paths } from '@/shared/enums'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()

  const handleLogoutClick = () => {
    localStorage.setItem('previousPath', router.asPath)
    router.push(Paths.logout)
  }

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
        <Typography className={s.title} onClick={handleLogoutClick} variant={'medium_text_14'}>
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
  label?: string
  path: string
}

export const Item = ({ Icon, OutlineIcon, isActive, label, path }: ItemProps) => {
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
