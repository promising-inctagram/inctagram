import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AlertDialog } from '@/components/alert-dialog'
import { ControlledTextArea } from '@/components/controlled-text-area'
import {
  Avatar,
  Button,
  Carousel,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
  Typography,
} from '@/components/ui'
import { BlankImage } from '@/components/ui/blankImage'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { useUpdatePostMutation } from '@/shared/api/post/post.api'
import { MAX_POST_DESCRIPTION_LENGTH } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import { createPostSchemeCreator } from '@/views/modals/add-post/model/create-post-scheme-creator'
import { AddPostFields } from '@/views/modals/add-post/model/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './PostEdit.module.scss'

import { handleErrors } from '../../utils/errorHandlers'

type PostEditProps = {
  avatar: string
  descriptionProp: string
  images: string[]
  isOpen: boolean
  postId: number
  toggleEditPostModal: () => void
  username: string
}

export const PostEdit = ({
  avatar,
  descriptionProp,
  images,
  isOpen,
  postId,
  toggleEditPostModal,
  username,
}: PostEditProps) => {
  const { t } = useTranslation()
  const { descriptionField, dialogTitle, saveButton } = t.profilePost.postEdit
  const { postEditAlert } = t.profilePost
  const descriptionPost = descriptionProp ? descriptionProp : ''
  const [updatePost] = useUpdatePostMutation()
  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState<boolean>(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const toggleConfirmExitEditModal = () => {
    setIsConfirmExitOpen(prev => !prev)
    toggleEditPostModal()
  }

  const { control, handleSubmit, reset, watch } = useForm<AddPostFields>({
    defaultValues: {
      description: descriptionPost,
    },
    mode: 'onChange',
    resolver: zodResolver(createPostSchemeCreator(t.createPost)),
  })

  const { description } = watch()

  useEffect(() => {
    if (isOpen) {
      reset({ description: descriptionProp })
    }
  }, [isOpen, descriptionProp, reset])

  const handleCloseModal = () => {
    if (description === descriptionPost) {
      toggleEditPostModal()
    } else {
      setIsConfirmExitOpen(prev => !prev)
    }
  }

  const updatePostHandler = handleSubmit(async data => {
    try {
      await updatePost({
        description: data.description,
        id: postId.toString(),
      }).unwrap()
      toggleEditPostModal()
    } catch (updateError) {
      handleErrors(updateError)
    }
  })

  const handleOpenCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).className === overlayRef.current?.className) {
      handleCloseModal()
    }
  }

  return (
    <DialogRoot open={isOpen}>
      <DialogOverlay onClick={e => handleOpenCloseModal(e)} ref={overlayRef}>
        <DialogContent className={s.content}>
          <VisuallyHidden asChild>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription>{dialogTitle}</DialogDescription>
          </VisuallyHidden>
          <DialogHeader className={s.header}>
            <Typography as={'h1'} variant={'h1'}>
              {dialogTitle}
            </Typography>
            <Button onClick={handleCloseModal} title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogHeader>

          <DialogBody className={s.body}>
            <div className={s.imageContainer}>
              <Carousel slides={images} />
            </div>
            <div className={s.container}>
              <div className={s.descriptionContainer}>
                <div className={s.profileName}>
                  {avatar ? (
                    <Avatar className={s.avatar} size={'xs'} src={avatar} />
                  ) : (
                    <BlankImage className={s.blankImage} height={18} type={'circle'} width={18} />
                  )}
                  <Typography>{username || 'username'}</Typography>
                </div>
                <ControlledTextArea
                  className={s.textField}
                  control={control}
                  label={descriptionField}
                  name={'description'}
                />
                <Typography className={s.smallText} variant={'small_text'}>
                  {description.length}/{MAX_POST_DESCRIPTION_LENGTH}
                </Typography>
              </div>
              <Button className={s.button} onClick={updatePostHandler}>
                {saveButton}
              </Button>
            </div>
            <AlertDialog
              confirmCallback={toggleConfirmExitEditModal}
              onOpenChange={setIsConfirmExitOpen}
              open={isConfirmExitOpen}
              t={postEditAlert}
            />
          </DialogBody>
        </DialogContent>
      </DialogOverlay>
    </DialogRoot>
  )
}
