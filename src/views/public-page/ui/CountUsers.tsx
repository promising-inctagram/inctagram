import { Card, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'

import s from './PublicPage.module.scss'

type Props = {
  countUsers: number
}

export const CountUsers = ({ countUsers }: Props) => {
  const { t } = useTranslation()
  const { registeredUsers } = t.publicPage
  const minDigits = 6
  const formattedCount = countUsers
    .toString()
    .padStart(Math.max(minDigits, countUsers.toString().length), '0')

  return (
    <Card className={s.card}>
      <Typography as={'h2'} variant={'h2'}>
        {registeredUsers}
      </Typography>
      <div className={s.countUsers}>
        {formattedCount.split('').map((digit, index) => (
          <div className={s.digitWrapper} key={index}>
            <Typography as={'h2'} className={s.digit} key={index} variant={'h2'}>
              {digit}
            </Typography>
          </div>
        ))}
      </div>
    </Card>
  )
}
