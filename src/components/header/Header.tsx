import Link from 'next/link'

import styles from './Header.module.scss'

import { Badge } from '../badge'
import { Button } from '../button'
import { BellOutlineIcon, FlagRussiaIcon, FlagUnitedKingdomIcon } from '../icons'
import { OptionsValue, Select } from '../select/Select'
import { Typography } from '../typography'

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

  // возможным решением будет использование контейнеров

  return (
    <div className={styles.wrapper}>
      <Typography as={'h1'} variant={'large'}>
        Inctagram
      </Typography>
      <div className={styles.container}>
        <div className={styles.button}>
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
            onValueChange={(value: string) => setLanguage(value)}
            options={selectItemsWithIcons}
          />
        </div>
        {!isAuth && (
          <Button as={Link} className={styles.button1} href={'/auth'} variant={'link'}>
            Log in
          </Button>
        )}
        {!isAuth && (
          <Button as={Link} className={styles.button2} href={'/auth'} variant={'primary'}>
            Sign up
          </Button>
        )}
      </div>
    </div>
  )
}
