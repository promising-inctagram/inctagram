import React, { useRef } from 'react'

import { Button, Card, DialogBody, DialogClose, DialogHeader, Typography } from '@/components/ui'
import { CloseOutlineIcon, ImageOutlineIcon } from '@/components/ui/icons'

import styles from './UploadPhoto.module.scss'

type UploadPhotoProps = {
  next: () => void
  setImages: (images: string[]) => void
}

const UploadPhoto = ({ next, setImages }: UploadPhotoProps) => {
  const fileInputRef = useRef(null)
  const onSubmit = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImages([reader.result])
        next()
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <DialogHeader className={styles.header}>
        <Typography as={'h1'} variant={'h1'}>
          Add photo
        </Typography>
        <DialogClose>
          <Button title={'close'} variant={'icon'}>
            <CloseOutlineIcon />
          </Button>
        </DialogClose>
      </DialogHeader>
      <DialogBody className={styles.body}>
        <Card className={styles.card}>
          <ImageOutlineIcon height={'48'} width={'48'} />
        </Card>
        <Button className={styles.button} onClick={onSubmit}>
          Select from Computer
        </Button>
        <input
          onChange={e => handleFileChange(e)}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
        <Button className={styles.button} variant={'outlined'}>
          Open draft
        </Button>
      </DialogBody>
    </>
  )
}

export default UploadPhoto
