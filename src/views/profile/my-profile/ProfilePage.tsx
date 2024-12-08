import * as React from 'react'
import { useEffect, useState } from 'react'

import { Page, getSidebarLayout } from '@/components'
import { Button, Typography } from '@/components/ui'
import { useGetUserPostsQuery } from '@/shared/api/profile/profile.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { Post, PostsRes } from '@/shared/types/public-page/Posts'
import { User } from '@/shared/types/public-page/User'
import clsx from 'clsx'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

const dataFollowing = [
  {
    following: 'Following',
    number: 2218,
  },
  {
    following: 'Following',
    number: 2218,
  },
  {
    following: 'Following',
    number: 2218,
  },
]

type Props = {
  isAuth: boolean
  post: Post<{}>
  profile: User
}
const ProfilePage = ({ isAuth, post, profile }: Props) => {
  const { t } = useTranslation()
  const { profile_settings } = t.profile
  const router = useRouter()
  const [isModal, setIsModal] = useState(false)
  const { data } = useGetUserPostsQuery(profile.id)

  const handleCloseModal = () => {
    // Удаляем параметр postId из URL
    router.replace(`/profile?userId=${profile.id}`, undefined, { shallow: true })
    setIsModal(false)
  }

  console.log(data)

  /*useEffect(() => {
                      if (!isAuth) {
                        setIsModal(true)
                      }
                    }, [isAuth])*/

  return (
    <section className={clsx('wrapper', s.container)}>
      {isAuth && (
        <div className={s.btnContainer}>
          <Button as={Link} href={Paths.profileSettings} variant={'secondary'}>
            {profile_settings}
          </Button>
        </div>
      )}
      {isModal ? (
        <div onClick={handleCloseModal}>Modal</div>
      ) : (
        <div>
          <div className={s.headerContainer}>
            <img
              alt={'Avatar'}
              className={s.image}
              src={profile.profile?.avatarInfo.mediumFilePath}
            />
            <div className={s.userInfoContainer}>
              <Typography as={'h1'} variant={'h1'}>
                {profile.profile?.lastName} {profile.profile?.firstName}
              </Typography>
              <div className={s.profileInfoContainer}>
                {dataFollowing.map(el => {
                  return (
                    <div className={s.followingContainer} key={el.number}>
                      <Typography as={'span'} variant={'bold_text_14'}>
                        {el.number}
                      </Typography>
                      <Typography as={'span'} variant={'regular_text_14'}>
                        {el.following}
                      </Typography>
                    </div>
                  )
                })}
              </div>
              <Typography variant={'regular_text_16'}>{profile.profile?.aboutMe}</Typography>
            </div>
          </div>
          <div className={s.postsWrapper}>
            {data?.posts.map((post: Post<{}>) => (
              <a href={''} key={post.id}>
                <img alt={'Image'} className={s.postImage} src={post.images[0].mediumFilePath} />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage
