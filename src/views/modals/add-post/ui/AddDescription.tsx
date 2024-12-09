import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextArea } from '@/components/controlled-text-area'
import {
  Avatar,
  Button,
  Card,
  Carousel,
  DialogBody,
  DialogHeader,
  Typography,
  showToast,
} from '@/components/ui'
import { ArrowIosBackIcon } from '@/components/ui/icons'
import { useCreatePostMutation, useUpdatePostMutation } from '@/shared/api/post/post.api'
import { MAX_POST_DESCRIPTION_LENGTH } from '@/shared/constants'
import { AuthContext } from '@/shared/contexts'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import styles from './AddDescription.module.scss'

import { createPostSchemeCreator } from '../model/create-post-scheme-creator'
import { AddPostFields } from '../model/types'

type AddDescriptionProps = {
  back: () => void
  images: string[]
  imagesFiles: File[]
  onOpenChange: (value: boolean) => void
}

const AddDescription = ({ back, images, imagesFiles, onOpenChange }: AddDescriptionProps) => {
  const { t } = useTranslation()
  const { descriptionField, modalButton, modalTitle } = t.createPost.addDescription
  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()
  const { meData } = useContext(AuthContext)
  const router = useRouter()
  const avatar = meData?.profile.avatarInfo.smallFilePath
  const username = meData?.username

  const { control, handleSubmit, watch } = useForm<AddPostFields>({
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(createPostSchemeCreator(t.createPost)),
  })

  const { description } = watch()

  const createPostHandler = handleSubmit(data => {
    const formData = new FormData()

    imagesFiles.forEach(file => {
      formData.append('files', file)
    })
    createPost(formData)
      .unwrap()
      .then(res => {
        updatePost({
          description: data.description,
          id: res.id,
        })
          .unwrap()
          .catch(e => {
            const errors = getErrorMessageData(e)

            if (typeof errors !== 'string') {
              errors.forEach(el => {
                showToast({
                  message: el.message,
                  variant: 'error',
                })
              })
            } else {
              showToast({
                message: errors,
                variant: 'error',
              })
            }
          })
        onOpenChange(false)
        router.push('/profile')
      })
      .catch(e => {
        const errors = getErrorMessageData(e)

        if (typeof errors !== 'string') {
          errors.forEach(el => {
            showToast({
              message: el.message,
              variant: 'error',
            })
          })
        } else {
          showToast({
            message: errors,
            variant: 'error',
          })
        }
      })
  })

  return (
    <>
      <DialogHeader className={styles.header}>
        <Button onClick={back} variant={'icon'}>
          <ArrowIosBackIcon />
        </Button>
        <Typography as={'h1'} variant={'h1'}>
          {modalTitle}
        </Typography>
        <Button onClick={createPostHandler} variant={'link'}>
          {modalButton}
        </Button>
      </DialogHeader>

      <DialogBody className={styles.body}>
        <div className={styles.imageContainer}>
          <Carousel slides={images} />
        </div>
        <div className={styles.descriptionContainer}>
          <Card className={styles.card}>
            <div className={styles.profileName}>
              <Avatar className={styles.avatar} size={'xs'} src={avatar} />
              <Typography>{username}</Typography>
            </div>
            <ControlledTextArea
              className={styles.textField}
              control={control}
              label={descriptionField}
              name={'description'}
            />
            <Typography className={styles.smallText} variant={'small_text'}>
              {description.length}/{MAX_POST_DESCRIPTION_LENGTH}
            </Typography>
          </Card>
          {/* <Card className={styles.card}>Add location</Card> */}
          {/* todo: Примечание: поле Location на текущем этапе не делаем */}
        </div>
      </DialogBody>
    </>
  )
}

export default AddDescription
