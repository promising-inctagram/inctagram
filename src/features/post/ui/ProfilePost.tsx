import React, { useState } from 'react'

import { AlertDialog } from '@/components/alert-dialog'
import { Avatar, Carousel, Typography } from '@/components/ui'
import { BlankImage } from '@/components/ui/blankImage'
import { useDeletePostMutation, useGetOnePostQuery } from '@/shared/api/post/post.api'
import { useGetUserProfileQuery } from '@/shared/api/profile/profile.api'
import { useTranslation } from '@/shared/hooks'

import s from './ProfilePost.module.scss'

import { handleErrors } from '../utils/errorHandlers'
import { PostDropDownMenu } from './PostDropDownMenu'
import { PostEdit } from './PostEdit'
import { PostWrapper } from './PostWrapper'

type ProfilePostProps = {
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  postId: number
  userId: string
}

//todo: сделать так чтобы при открытии не показывало старый пост

export const ProfilePost = ({ isOpen, onOpenChange, postId, userId }: ProfilePostProps) => {
  const { data: userData } = useGetUserProfileQuery({ id: userId }, { skip: !userId })
  const { data: postData } = useGetOnePostQuery(postId)
  const avatar = userData?.profile?.avatarInfo?.mediumFilePath || ''
  const username = userData?.username || ''
  const images = postData?.images?.map(elem => elem.originFilePath) || []
  const description = postData?.description || ''
  const [deletePost] = useDeletePostMutation()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const { t } = useTranslation()

  const handleCloseModal = () => {
    setIsOpenModal(prev => !prev)
  }

  const handleEditModal = () => {
    setIsOpenEditModal(prev => !prev)
  }

  const handleDeletePost = async () => {
    if (!postId) {
      return
    }

    try {
      await deletePost(postId).unwrap()
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
              {username || 'username'}
            </Typography>
          </div>
          <PostDropDownMenu handleCloseModal={handleCloseModal} handleEditModal={handleEditModal} />
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
        <AlertDialog
          confirmCallback={handleDeletePost}
          onOpenChange={handleCloseModal}
          open={isOpenModal}
          t={t.profilePost.deletePostAlert}
        />
        <PostEdit
          avatar={avatar}
          descriptionProp={description}
          handleEditModal={handleEditModal}
          images={images}
          isOpen={isOpenEditModal}
          postId={postId}
          username={username}
        />
      </div>
    </PostWrapper>
  )
}
