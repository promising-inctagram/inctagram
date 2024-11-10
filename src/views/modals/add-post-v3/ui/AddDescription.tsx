import React from 'react'

import { ControlledTextField } from '@/components/controlled-text-field'
import {
  Avatar,
  Button,
  Card,
  Carousel,
  DialogBody,
  DialogHeader,
  TextField,
  Typography,
} from '@/components/ui'
import { ArrowIosBackIcon } from '@/components/ui/icons'
import { useCreatePostMutation } from '@/shared/api/post/post.api'

import styles from './AddDescription.module.scss'

type AddDescriptionProps = {
  back: () => void
  images: string[]
  imagesFiles: any
}

const AddDescription = ({ back, images, imagesFiles }: AddDescriptionProps) => {
  const [createPost] = useCreatePostMutation()

  const createPostHandler = async () => {
    const fetchData = {
      files: imagesFiles,
    }

    console.log(fetchData)
    try {
      await createPost(fetchData).unwrap
    } catch (e) {
      console.error('АШИБКА:', e)
    }
  }

  return (
    <>
      <DialogHeader className={styles.header}>
        <Button onClick={back} variant={'icon'}>
          <ArrowIosBackIcon />
        </Button>
        <Typography as={'h1'} onClick={createPostHandler} variant={'h1'}>
          Publication
        </Typography>
        <Button variant={'link'}>Publish </Button>
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
            <TextField
              className={styles.textField}
              label={'Add publication descriptions'}
              placeholder={'tdddddype something...'}
            />
          </Card>
          {/* <Card className={styles.card}>Add location</Card> */}
          {/* todo: Примечание: поле Location на текущем этапе не делаем */}
        </div>
      </DialogBody>
    </>
  )
}

export default AddDescription
