import { Avatar, Typography } from '@/components/ui'

import s from './UrlProfile.module.scss'

type Props = {
  src: string
  userName: string
}
export const UrlProfile = ({ src, userName }: Props) => {
  return (
    <div className={s.user}>
      <Avatar size={'xs'} src={src} userName={userName || 'UserName'} />
      <Typography as={'h3'} variant={'h3'}>
        {userName || 'UserName'}
      </Typography>
    </div>
  )
}
