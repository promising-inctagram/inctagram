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

  return (
    <div className={styles.wrapper}>
      <Typography as={'h1'} variant={'large'}>
        Inctagram
      </Typography>
      <div className={styles.container}>
        {isAuth && (
          <Button style={{ marginRight: 48 }} variant={'icon'}>
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
        {!isAuth && (
          <Button as={Link} href={'/auth'} style={{ marginLeft: 36, width: 100 }} variant={'link'}>
            Log in
          </Button>
        )}
        {!isAuth && (
          <Button
            as={Link}
            href={'/auth'}
            style={{ marginLeft: 24, padding: '6px 20px', width: 100 }}
            variant={'primary'}
          >
            Sign up
          </Button>
        )}
      </div>
    </div>
  )
}
