import { useState } from 'react'

import { Button, Item } from '@/components/ui'
import { DropDownMenu } from '@/components/ui/dropdown/DropDownMenu'
import MoreHorizontalIcon from '@/components/ui/icons/MoreHorizontalIcon'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import clsx from 'clsx'
import Link from 'next/link'

import styles from '@/components/header/Header.module.scss'

export const HeaderMobileMenu = () => {
  const { t } = useTranslation()
  const [moreMenuIsShow, setMoreMenuIsShow] = useState(false)

  const handleMoreMenuShow = () => {
    setMoreMenuIsShow(true)
  }

  return (
    <DropDownMenu
      className={clsx(moreMenuIsShow && styles.showMenu)}
      trigger={<MoreHorizontalIcon />}
    >
      <Item onClick={handleMoreMenuShow}>
        <Button
          as={Link}
          className={clsx(styles.button)}
          href={Paths.logIn}
          variant={'nb-outlined'}
        >
          {t.header.loginButton}
        </Button>
      </Item>
      <Item onClick={handleMoreMenuShow}>
        <Button as={Link} className={styles.button} href={Paths.signUp} variant={'primary'}>
          {t.header.signUpButton}
        </Button>
      </Item>
    </DropDownMenu>
  )
}
