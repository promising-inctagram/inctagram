import React from 'react'
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
} from '@/components/ui'
import { ArrowIosBackIcon } from '@/components/ui/icons'
import { useCreatePostMutation, useUpdatePostMutation } from '@/shared/api/post/post.api'
import { useTranslation } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import styles from './AddDescription.module.scss'

type AddDescriptionProps = {
  back: () => void
  images: string[]
  imagesFiles: File[]
}

const AddDescription = ({ back, images, imagesFiles }: AddDescriptionProps) => {
  const { t } = useTranslation()
  const { descriptionField, modalButton, modalTitle } = t.createPost.addDescription
  const [createPost] = useCreatePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const { control, handleSubmit, setError, watch } = useForm({
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        description: z
          .string()
          .max(500, 'Описание не может быть больше 500 символов')
          .refine(
            value => value.length === 0 || value.trim().length > 0,
            'Поле не может быть пустым'
          ),
      })
    ),
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
        if (data.description.length !== 0) {
          updatePost({
            description: data.description,
            id: res.id,
          })
            .unwrap()
            .catch(e => setError('description', { message: e.data }))
        }
      })
      .catch(e => setError('description', { message: e.data.errorsMessages }))
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
              <Avatar className={styles.avatar} size={'xs'} src={images[0]} />
              <Typography>URLProfiele</Typography>
            </div>
            <ControlledTextArea
              className={styles.textField}
              control={control}
              label={descriptionField}
              name={'description'}
            />
            <Typography className={styles.smallText} variant={'small_text'}>
              {description.length}/500
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
