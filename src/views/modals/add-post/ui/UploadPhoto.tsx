import React, { useRef } from 'react'

import {
  Button,
  Card,
  DialogBody,
  DialogClose,
  DialogHeader,
  Typography,
  showToast,
} from '@/components/ui'
import { CloseOutlineIcon, ImageOutlineIcon } from '@/components/ui/icons'
import { MAX_POST_FILE_SIZE } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'

import styles from './UploadPhoto.module.scss'

type UploadPhotoProps = {
  next: () => void
  setImages: (images: string[]) => void
  setImagesFilers: (value: File[]) => void
  setIsOpenCloseModal: (value: boolean) => void
}

const UploadPhoto = ({
  next,
  setImages,
  setImagesFilers,
  setIsOpenCloseModal,
}: UploadPhotoProps) => {
  const { t } = useTranslation()
  const { buttonDraft, buttonUploadPhoto, modalTitle, uploadError } = t.createPost.uploadPhoto
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      if (file.size < MAX_POST_FILE_SIZE) {
        setImagesFilers([file])
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImages([reader.result]) //
            next()
          }
        }
        reader.readAsDataURL(file)
      } else {
        showToast({
          message: uploadError,
          variant: 'error',
        })
      }
    }
  }

  return (
    <>
      <DialogHeader className={styles.header}>
        <Typography as={'h1'} variant={'h1'}>
          {modalTitle}
        </Typography>
        <Button onClick={() => setIsOpenCloseModal(true)} title={'close'} variant={'icon'}>
          <CloseOutlineIcon />
        </Button>
      </DialogHeader>
      <DialogBody className={styles.body}>
        <Card className={styles.card}>
          <ImageOutlineIcon height={'48'} width={'48'} />
        </Card>
        <Button className={styles.button} onClick={onSubmit}>
          {buttonUploadPhoto}
          <input
            accept={'.jpg,.png'}
            hidden
            onChange={e => handleFileChange(e)}
            ref={fileInputRef}
            type={'file'}
          />
        </Button>
        <Button className={styles.button} variant={'outlined'}>
          {buttonDraft}
        </Button>
      </DialogBody>
    </>
  )
}

export default UploadPhoto
