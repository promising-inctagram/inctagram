import { Card, Typography } from '@/components/ui'

import s from './PublicPage.module.scss'

type Props = {
  countUsers: any
}

export const CountUsers = ({ countUsers }: Props) => {
  return (
    <Card className={s.card}>
      <Typography as={'span'}>Registered users:</Typography>
      <div style={{ backgroundColor: 'black', height: 50, width: 100 }}>{countUsers}</div>
    </Card>
  )
}
