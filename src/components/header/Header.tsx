import Link from 'next/link'

import styles from './Header.module.scss'

import { Badge } from '../badge'
import { Button } from '../button'
import { BellOutlineIcon, FlagRussiaIcon, FlagUnitedKingdomIcon } from '../icons'
import { OptionsValue, Select } from '../select/Select'
import { Typography } from '../typography'

export type HeaderProps = {
  isAuth: boolean
}

const selectItemsWithIcons: OptionsValue[] = [
  { icon: <FlagRussiaIcon />, value: 'Russia' },
  { icon: <FlagUnitedKingdomIcon />, value: 'English' },
]

export const Header = (props: HeaderProps) => {
  const { isAuth = false } = props

  return (
    <div className={styles.wrapper}>
      <Typography as={'h1'} variant={'large'}>
        Inctagram
      </Typography>
      <div className={styles.container}>
        {isAuth && (
          <Button style={{ marginRight: 48 }} variant={'icon'}>
            <Badge count={3}>
              <BellOutlineIcon />
            </Badge>
          </Button>
        )}
        <Select defaultValue={selectItemsWithIcons[0].value} options={selectItemsWithIcons} />
        {!isAuth && (
          <Button style={{ marginLeft: 36, width: 100 }} variant={'link'}>
            {/* <Link href={'auth/'}>Log in</Link> */}
            Log in
          </Button>
        )}
        {!isAuth && (
          <Button style={{ marginLeft: 24, padding: '6px 20px', width: 100 }} variant={'primary'}>
            {/* <Link href={'auth/'}>Sign up</Link> */}
            Sign up
          </Button>
        )}
      </div>
    </div>
  )
}
