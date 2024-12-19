import { Typography } from '@/components/ui'

import s from './ProfileStats.module.scss'

type ProfileStatsProps = {}
export const ProfileStats = ({}: ProfileStatsProps) => {
  return (
    <div className={s.stats}>
      <Typography variant={'regular_text_14'}>some Following</Typography>
      <Typography variant={'regular_text_14'}>some Followers</Typography>
      <Typography variant={'regular_text_14'}>some Publications</Typography>
    </div>
  )
}
