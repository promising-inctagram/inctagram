import { ComponentPropsWithoutRef, useContext } from 'react'

import { Avatar, Button, Typography } from '@/components/ui'
import { ProfileStats } from '@/features/ui/stats'
import { useGetUserProfileQuery } from '@/shared/api/profile/profile.api'
import { AuthContext } from '@/shared/contexts'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import clsx from 'clsx'
import link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfileHeader.module.scss'

type ProfileHeaderProps = { userId: string } & ComponentPropsWithoutRef<'section'>

export const ProfileHeader = ({ className, userId, ...props }: ProfileHeaderProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isAuth, meData } = useContext(AuthContext)
  const { data } = useGetUserProfileQuery({ id: userId }, { skip: !userId })

  const showSettingsButton = isAuth && meData?.id === router.query.id

  return (
    <section className={clsx(s.container, className)} {...props}>
      <Avatar
        className={s.avatar}
        src={data?.profile.avatarInfo?.mediumFilePath ?? ''}
        userName={data?.username}
      />
      <div className={s.content}>
        <div className={s.titleBlock}>
          <Typography as={'h1'} variant={'h1'}>
            {data?.username}
          </Typography>
          {showSettingsButton && (
            <Button as={link} href={Paths.settings} variant={'secondary'}>
              {t.profile.profile_settings}
            </Button>
          )}
        </div>
        <ProfileStats />
        <Typography className={s.aboutMe}>{data?.profile.aboutMe ?? ''}</Typography>
      </div>
    </section>
  )
}
