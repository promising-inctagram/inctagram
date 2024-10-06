import { Badge, Button, Select, Typography } from '@/components/ui'
import { BellOutlineIcon } from '@/components/ui/icons'
import FlagRussiaIcon from '@/components/ui/icons/flags/FlagRussiaIcon'
import FlagUnitedKingdomIcon from '@/components/ui/icons/flags/FlagUnitedKingdomIcon'
import { Paths } from '@/shared/enums'
import Link from 'next/link'

import styles from '@/components/header/Header.module.scss'

import { OptionsValue } from '../ui/select'

export type HeaderProps = {
  countNotification?: number
  isAuth?: boolean
  setLanguage?: (value: string) => void
}

const selectItemsWithIcons: OptionsValue[] = [
  { icon: <FlagRussiaIcon />, value: 'Russia' },
  { icon: <FlagUnitedKingdomIcon />, value: 'English' },
]

export const Header = ({ countNotification, isAuth = true, setLanguage }: HeaderProps) => {
  const handleLanguage = (value: string) => {
    setLanguage?.(value)
  }

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
        <Select
          defaultValue={selectItemsWithIcons[0].value}
          onValueChange={handleLanguage}
          options={selectItemsWithIcons}
        />
        {!isAuth && (
          <>
            <Button as={Link} className={styles.button} href={Paths.logIn} variant={'link'}>
              Log in
            </Button>
            <Button as={Link} className={styles.button} href={Paths.signUp} variant={'primary'}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
