import React, { useState } from 'react'

import { Avatar, Carousel, Typography, showToast } from '@/components/ui'
import { BlankImage } from '@/components/ui/blankImage'
import { useDeletePostMutation } from '@/shared/api/post/post.api'
import { Post } from '@/shared/api/post/post.types'
import { useGetUserProfileQuery } from '@/shared/api/profile/profile.api'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'

import s from './ProfilePost.module.scss'

import { PostCloseModal } from './PostCloseModal'
import { PostDropDownMenu } from './PostDropDownMenu'
import { PostWrapper } from './PostWrapper'

type ProfilePostProps = {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  post: Post | null
  userId: string
}

export const ProfilePost = ({ isOpen, onOpenChange, post, userId }: ProfilePostProps) => {
  const { data } = useGetUserProfileQuery({ id: userId }, { skip: !userId })
  const avatar = data?.profile.avatarInfo?.mediumFilePath
  const username = data?.username
  const images = post?.images.map(elem => elem.originFilePath) || []
  const description = post?.description
  const [deletePost] = useDeletePostMutation()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsOpenModal(prev => !prev)
  }

  const handleErrors = (error: unknown) => {
    const errors = getErrorMessageData(error)

    if (typeof errors === 'string') {
      showToast({ message: errors, variant: 'error' })
    } else {
      errors.forEach(el => {
        showToast({ message: el.message, variant: 'error' })
      })
    }
  }

  const handleDeletePost = async () => {
    if (!post?.id) {
      return
    }

    try {
      await deletePost(post?.id).unwrap()
      onOpenChange(false)
      setIsOpenModal(false)
    } catch (e) {
      handleErrors(e)
    }
  }

  return (
    <PostWrapper isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className={s.carouselContainer}>
        <Carousel slides={images} />
      </div>
      <div className={s.postInfo}>
        <div className={s.postHeader}>
          <div className={s.profileName}>
            {avatar ? (
              <Avatar className={s.avatar} size={'xs'} src={avatar} userName={username} />
            ) : (
              <BlankImage className={s.blankImage} height={18} type={'circle'} width={18} />
            )}
            <Typography as={'h3'} variant={'h3'}>
              {username ? username : 'username'}
            </Typography>
          </div>
          <PostDropDownMenu handleCloseModal={handleCloseModal} />
        </div>
        {description && (
          <div className={s.description}>
            <div className={s.avatarContainer}>
              {avatar ? (
                <Avatar className={s.avatar} size={'xs'} src={avatar} userName={username} />
              ) : (
                <BlankImage className={s.blankImage} height={18} type={'circle'} width={18} />
              )}
            </div>
            <Typography variant={'regular_text_14'}>
              <Typography as={'span'} variant={'bold_text_14'}>
                {username ? username : 'username'}
              </Typography>
              {` ${description}`}
            </Typography>
          </div>
        )}
        <PostCloseModal
          handleDeletePost={handleDeletePost}
          isOpen={isOpenModal}
          onOpenChange={handleCloseModal}
        />
      </div>
    </PostWrapper>
  )
}
