import { ComponentPropsWithoutRef, ComponentType, ElementRef, forwardRef, useState } from 'react'

import { menuItems } from '@/components/sidebar/menu-items'
import { Typography } from '@/components/ui'
import { LogOutOutlineIcon, PlusSquareIcon, PlusSquareOutlineIcon } from '@/components/ui/icons'
import AddPost from '@/views/modals/add-post'
import { LogoutConfirmation } from '@/views/modals/logout-confirmation/LogoutConfirmation'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()
  const [openLogoutModal, setOpenLogoutModal] = useState(false)
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false)

  const handleLogoutClick = () => {
    setOpenLogoutModal(true)
  }

  const handleCreatePostClick = () => {
    setOpenCreatePostModal(true)
  }

  return (
    <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
      <div className={s.group}>
        {menuItems.slice(0, 1).map(({ Icon, OutlineIcon, label, path }, index) => (
          <Item
            Icon={Icon}
            OutlineIcon={OutlineIcon}
            isActive={router.pathname === path}
            key={label + index}
            label={label}
            path={path}
          />
        ))}
        <Typography
          as={'button'}
          className={s.title}
          onClick={handleCreatePostClick}
          variant={'medium_text_14'}
        >
          <PlusSquareOutlineIcon className={s.icon} />
          Create
        </Typography>
        {menuItems.slice(1, 4).map(({ Icon, OutlineIcon, label, path }, index) => (
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
        {menuItems.slice(4).map(({ Icon, OutlineIcon, label, path }, index) => (
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
        <Typography
          as={'button'}
          className={s.title}
          onClick={handleLogoutClick}
          variant={'medium_text_14'}
        >
          <LogOutOutlineIcon className={s.icon} />
          Log Out
        </Typography>
      </div>
      {openLogoutModal && (
        <LogoutConfirmation isOpen={openLogoutModal} onOpenChange={setOpenLogoutModal} />
      )}
      <AddPost isOpen={openCreatePostModal} onOpenChange={setOpenCreatePostModal} />
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
