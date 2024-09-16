import styles from './Header.module.scss'

import { Badge } from '../badge'
import { Button } from '../button'
import { BellOutlineIcon } from '../icons'
import { Typography } from '../typography'

export type HeaderProps = {
  isAuth: boolean
}

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
        <div className={styles.select}>English</div>
        {!isAuth && (
          <Button style={{ marginLeft: 36 }} variant={'link'}>
            Log in
          </Button>
        )}
        {!isAuth && (
          <Button style={{ marginLeft: 24 }} variant={'primary'}>
            Sign up
          </Button>
        )}
      </div>
    </div>
  )
}
