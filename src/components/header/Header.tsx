import { SelectLanguage } from '@/components/select-language'
import { Badge, Button, Typography } from '@/components/ui'
import { BellOutlineIcon } from '@/components/ui/icons'
import { Paths } from '@/shared/enums'
import Link from 'next/link'

import styles from '@/components/header/Header.module.scss'

export type HeaderProps = {
  countNotification?: number
  isAuth?: boolean
}

export const Header = ({ countNotification, isAuth = false }: HeaderProps) => {
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
        {!isAuth && (
          <div className={styles.buttonContainer}>
            <Button as={Link} className={styles.button} href={Paths.logIn} variant={'nb-outlined'}>
              Log in
            </Button>
            <Button as={Link} className={styles.button} href={Paths.signUp} variant={'primary'}>
              Sign up
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
