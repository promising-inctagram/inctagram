import * as React from 'react'
import { useEffect, useState } from 'react'

import { getSidebarLayout } from '@/components'
import { Avatar, Button, Typography } from '@/components/ui'
import { useGetUserPostsQuery } from '@/shared/api/profile/profile.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { PostType } from '@/shared/types/public-page/Posts'
import { User } from '@/shared/types/public-page/User'
import { PostModal } from '@/views/profile/PostModal'
import clsx from 'clsx'
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
  post: PostType<{}>
  postId: string | string[] | undefined
  profile: User
}
const ProfilePage = ({ isAuth, post, postId, profile }: Props) => {
  const { t } = useTranslation()
  const { profile_settings } = t.profile
  const router = useRouter()
  const { id } = router.query

  const { data } = useGetUserPostsQuery(id as string)

  console.log(data)
  const [isOpenPost, setIsOpenPost] = useState(true)

  const handleClosePost = () => {
    // Удаляем параметр post из URL

    router.replace(`/profile/${profile.id}`, undefined, { shallow: true })

    setIsOpenPost(false)
  }

  const handleOpenPost = () => {
    setIsOpenPost(true)
  }

  /*useEffect(() => {
        if (postId) {
          setIsOpenPost(true)
        }
      }, [postId])*/

  return (
    <section className={clsx('wrapper', s.container)}>
      {isAuth && (
        <div className={s.btnContainer}>
          <Button as={Link} href={Paths.settings} variant={'secondary'}>
            {profile_settings}
          </Button>
        </div>
      )}
      {postId && (
        <PostModal
          handleClosePost={handleClosePost}
          isOpen={isOpenPost}
          post={post}
          profile={profile}
        />
      )}
      <div>
        <div className={s.headerContainer}>
          <Avatar
            className={s.image}
            src={profile?.profile.avatarInfo.originFilePath}
            userName={profile?.username}
          />
          <div className={s.userInfoContainer}>
            <Typography as={'h1'} variant={'h1'}>
              {profile?.profile.lastName} {profile?.profile.firstName}
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
            <Typography variant={'regular_text_16'}>{profile?.profile.aboutMe}</Typography>
          </div>
        </div>
        <div className={s.postsWrapper}>
          {data?.posts.map((post: PostType<{}>) => (
            <a href={`/profile/${profile?.id}/post/${post.id}`} key={post.id}>
              <img alt={'Image'} className={s.postImage} src={post.images[0]?.originFilePath} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

ProfilePage.getLayout = getSidebarLayout
export default ProfilePage

/*<div className={clsx(s.modalCardContainer, isModal && s.profileContainerOpacity)}>
                                                <Card className={s.modalCard}>
                                                  <Button className={s.modalCloseIcon} onClick={handleCloseModal} variant={'icon'}>
                                                    <CloseIcon />
                                                  </Button>
                                                  <div className={s.postContainer}>
                                                    <div className={s.carouselContainer}>
                                                      <Carousel slides={post?.images} />
                                                    </div>
                                      
                                                    <div className={s.urlProfileContainer}>
                                                      <UrlProfile
                                                        src={profile?.profile.avatarInfo.smallFilePath}
                                                        userName={profile?.username}
                                                      />
                                                    </div>
                                                  </div>
                                                </Card>
                                              </div>*/
