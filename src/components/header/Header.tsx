import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { BellOutlineIcon, FlagRussiaIcon, FlagUnitedKingdomIcon } from '@/components/icons'
import { OptionsValue, Select } from '@/components/select/Select'
import { Paths } from '@/components/sidebar/menu-items'
import { Typography } from '@/components/typography'
import Link from 'next/link'

import styles from '@/components/header/Header.module.scss'

export type HeaderProps = {
  countNotification?: number
  isAuth: boolean
  setLanguage: (value: string) => void
}

const selectItemsWithIcons: OptionsValue[] = [
  { icon: <FlagRussiaIcon />, value: 'Russia' },
  { icon: <FlagUnitedKingdomIcon />, value: 'English' },
]

export const Header = (props: HeaderProps) => {
  const { countNotification, isAuth, setLanguage } = props

  const handleLanguage = (value: string) => {
    setLanguage(value)
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
          className={styles.select}
          defaultValue={selectItemsWithIcons[0].value}
          onValueChange={handleLanguage}
          options={selectItemsWithIcons}
        />
        {!isAuth && (
          <Button as={Link} className={styles.buttonLogin} href={Paths.login} variant={'link'}>
            Log in
          </Button>
        )}
        {!isAuth && (
          <Button as={Link} className={styles.buttonSignup} href={Paths.signin} variant={'primary'}>
            Sign up
          </Button>
        )}
      </div>
    </div>
  )
}
