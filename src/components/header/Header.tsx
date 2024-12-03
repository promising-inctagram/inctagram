import { useContext } from 'react'

import { HeaderMobileMenu } from '@/components/header/HeaderMobileMenu'
import { SelectLanguage } from '@/components/select-language'
import { Badge, Button, Typography } from '@/components/ui'
import { BellOutlineIcon } from '@/components/ui/icons'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { useIsMobileOrTabletVersion } from '@/shared/hooks/useIsMobileOrTabletVersion'
import Link from 'next/link'

import styles from '@/components/header/Header.module.scss'

export type HeaderProps = {
  countNotification?: number
}

export const Header = ({ countNotification }: HeaderProps) => {
  const { isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  const isTablet = useIsMobileOrTabletVersion()

  return (
    <div className={styles.wrapper}>
      <Typography as={'h1'} variant={'large'}>
        Inctagram
      </Typography>
      <div className={styles.container}>
        {isAuth && (
          <Button className={styles.buttonBell} variant={'icon'}>
            <Badge count={countNotification}>
              <BellOutlineIcon />
            </Badge>
          </Button>
        )}
        <SelectLanguage />
        {!isAuth && !isTablet && (
          <div className={styles.buttonContainer}>
            <Button as={Link} className={styles.button} href={Paths.logIn} variant={'nb-outlined'}>
              {t.header.loginButton}
            </Button>
            <Button as={Link} className={styles.button} href={Paths.signUp} variant={'primary'}>
              {t.header.signUpButton}
            </Button>
          </div>
        )}
        {!isAuth && isTablet && <HeaderMobileMenu />}
      </div>
    </div>
  )
}
