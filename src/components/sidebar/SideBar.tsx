import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext, useState } from 'react'

import { Button, Typography } from '@/components/ui'
import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  LogOutOutlineIcon,
  MessageCircleIcon,
  MessageCircleOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  PlusSquareIcon,
  SearchIcon,
  SearchOutlineIcon,
  TrendingUpIcon,
  TrendingUpOutlineIcon,
} from '@/components/ui/icons'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { LogoutConfirmation } from '@/views/modals/logout-confirmation/LogoutConfirmation'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SideBar.module.scss'

type SideBarProps = ComponentPropsWithoutRef<'nav'>
type SideBarRef = ElementRef<'nav'>

export const SideBar = forwardRef<SideBarRef, SideBarProps>(({ className, ...rest }, ref) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { isAuth, meData } = useContext(AuthContext)
  const [openLogoutModal, setOpenLogoutModal] = useState(false)

  if (!isAuth) {
    return null
  }
  const handleLogoutClick = () => {
    setOpenLogoutModal(true)
  }

  return (
    <nav className={clsx(s.sidebar, className)} ref={ref} {...rest}>
      <div className={s.group}>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.home}
          href={Paths.home}
          variant={'medium_text_14'}
        >
          {router.pathname === Paths.home ? (
            <HomeIcon className={s.icon} />
          ) : (
            <HomeOutlineIcon className={s.icon} />
          )}
          {t.sidebar.home}
        </Typography>
        <Button className={s.title} fullWidth variant={'icon'}>
          <PlusSquareIcon className={s.icon} />
          {t.sidebar.create}
        </Button>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.asPath === `${Paths.profile}/${meData?.id}`}
          href={`${Paths.profile}/${meData?.id}`}
          variant={'medium_text_14'}
        >
          {router.asPath === `${Paths.profile}/${meData?.id}` ? (
            <PersonIcon className={s.icon} />
          ) : (
            <PersonOutlineIcon className={s.icon} />
          )}
          {t.sidebar.my_profile}
        </Typography>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.messages}
          href={Paths.messages}
          variant={'medium_text_14'}
        >
          {router.pathname === Paths.messages ? (
            <MessageCircleIcon className={s.icon} />
          ) : (
            <MessageCircleOutlineIcon className={s.icon} />
          )}
          {t.sidebar.messenger}
        </Typography>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.search}
          href={Paths.search}
          variant={'medium_text_14'}
        >
          {router.pathname === Paths.search ? (
            <SearchIcon className={s.icon} />
          ) : (
            <SearchOutlineIcon className={s.icon} />
          )}
          {t.sidebar.search}
        </Typography>
      </div>
      <div className={s.group}>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.statistics}
          href={Paths.statistics}
          variant={'medium_text_14'}
        >
          {router.pathname === Paths.statistics ? (
            <TrendingUpIcon className={s.icon} />
          ) : (
            <TrendingUpOutlineIcon className={s.icon} />
          )}
          {t.sidebar.statistics}
        </Typography>
        <Typography
          as={Link}
          className={s.title}
          data-active={router.pathname === Paths.favourites}
          href={Paths.favourites}
          variant={'medium_text_14'}
        >
          {router.pathname === Paths.favourites ? (
            <BookmarkIcon className={s.icon} />
          ) : (
            <BookmarkOutlineIcon className={s.icon} />
          )}
          {t.sidebar.favourites}
        </Typography>
      </div>
      <div className={s.group}>
        {isAuth && (
          <Typography as={'button'} className={s.title} onClick={handleLogoutClick}>
            <LogOutOutlineIcon className={s.icon} />
            {t.sidebar.log_out}
          </Typography>
        )}
      </div>
      {openLogoutModal && (
        <LogoutConfirmation isOpen={openLogoutModal} onOpenChange={setOpenLogoutModal} />
      )}
    </nav>
  )
})

SideBar.displayName = 'SideBar'
