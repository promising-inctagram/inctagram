import { ComponentPropsWithoutRef, ComponentType, ElementRef, forwardRef, useState } from 'react'

import { SidebarMenuItems } from '@/components/sidebar/menu-items'
import { Typography } from '@/components/ui'
import { LogoutConfirmation } from '@/views/modals/logout-confirmation/LogoutConfirmation'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()
  const menuItems = SidebarMenuItems()
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const handleLogoutClick = () => {
    setOpenLogoutModal(true)
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
        {menuItems.slice(5, 7).map(({ Icon, OutlineIcon, label, path }, index) => (
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
        {menuItems.slice(7).map(({ Icon, OutlineIcon, label }, index) => (
          <Item
            Icon={Icon}
            OutlineIcon={OutlineIcon}
            key={label + index}
            label={label}
            onClick={handleLogoutClick}
          />
        ))}
      </div>
      {openLogoutModal && (
        <LogoutConfirmation isOpen={openLogoutModal} onOpenChange={setOpenLogoutModal} />
      )}
    </nav>
  )
})

type ItemProps = {
  Icon: ComponentType<{ className: string }>
  OutlineIcon: ComponentType<{ className: string }>
  isActive?: boolean
  label?: string
  onClick?: () => void
  path?: string
}

export const Item = ({ Icon, OutlineIcon, isActive, label, onClick, path }: ItemProps) => {
  return (
    <Typography
      as={path ? Link : 'button'}
      className={s.title}
      data-active={isActive}
      href={path}
      onClick={onClick}
      variant={'medium_text_14'}
    >
      {isActive ? <Icon className={s.icon} /> : <OutlineIcon className={s.icon} />}
      {label}
    </Typography>
  )
}
