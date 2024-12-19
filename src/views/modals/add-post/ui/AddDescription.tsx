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
import { BlankImage } from '@/components/ui/blankImage'
import { ArrowIosBackIcon } from '@/components/ui/icons'
import { useCreatePostMutation, useUpdatePostMutation } from '@/shared/api/post/post.api'
import { MAX_POST_DESCRIPTION_LENGTH } from '@/shared/constants'
import { AuthContext } from '@/shared/contexts'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './AddDescription.module.scss'

import { createPostSchemeCreator } from '../model/create-post-scheme-creator'
import { AddPostFields } from '../model/types'

type AddDescriptionProps = {
  back: () => void
  imagesFiles: File[]
  imagesPreviews: string[]
  onOpenChange: (value: boolean) => void
  setStepIndex: (value: number) => void
}

const AddDescription = ({
  back,
  imagesFiles,
  imagesPreviews,
  onOpenChange,
  setStepIndex,
}: AddDescriptionProps) => {
  const { t } = useTranslation()
  const { descriptionField, modalButton, modalTitle } = t.createPost.addDescription
  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()
  const { meData } = useContext(AuthContext)
  const avatar = meData?.profile.avatarInfo?.smallFilePath
  const username = meData?.username

  const { control, handleSubmit, watch } = useForm<AddPostFields>({
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(createPostSchemeCreator(t.createPost)),
  })

  const { description } = watch()

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

  const createPostHandler = handleSubmit(async data => {
    const formData = new FormData()

    imagesFiles.forEach(file => {
      formData.append('files', file)
    })

    try {
      const res = await createPost(formData).unwrap()

      if (data.description.length !== 0) {
        try {
          await updatePost({
            description: data.description,
            id: res.id,
          }).unwrap()
        } catch (updateError) {
          handleErrors(updateError)
        }
      }
      setStepIndex(0)
      onOpenChange(false)
    } catch (createError) {
      handleErrors(createError)
    }
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
          <Carousel slides={imagesPreviews} />
        </div>
        <div className={styles.descriptionContainer}>
          <Card className={styles.card}>
            <div className={styles.profileName}>
              {avatar ? (
                <Avatar className={styles.avatar} size={'xs'} src={avatar} />
              ) : (
                <BlankImage className={styles.blankImage} height={18} type={'circle'} width={18} />
              )}
              <Typography>{username ? username : 'username'}</Typography>
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
          {/* todo: Примечание: поле Location на текущем этапе не делаем */}
        </div>
      </DialogBody>
    </>
  )
}

export default AddDescription
