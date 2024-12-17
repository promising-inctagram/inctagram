import React, { useRef } from 'react'

import { Button, Card, DialogBody, DialogHeader, Typography, showToast } from '@/components/ui'
import { BlankImage } from '@/components/ui/blankImage'
import { CloseOutlineIcon, ImageOutlineIcon } from '@/components/ui/icons'
import { MAX_POST_FILE_SIZE, POST_FILE_TYPES } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'

import styles from './UploadPhoto.module.scss'

type UploadPhotoProps = {
  next: () => void
  setImagesFilers: (value: File[]) => void
  setImagesPreviews: (images: string[]) => void
  setIsOpenCloseModal: (value: boolean) => void
}

const UploadPhoto = ({
  next,
  setImagesFilers,
  setImagesPreviews,
  setIsOpenCloseModal,
}: UploadPhotoProps) => {
  const { t } = useTranslation()
  const { buttonDraft, buttonUploadPhoto, modalTitle, typeImageError, uploadError } =
    t.createPost.uploadPhoto
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      if (!POST_FILE_TYPES.includes(file.type)) {
        showToast({
          message: typeImageError,
          variant: 'error',
        })

        return
      }

      if (file.size >= MAX_POST_FILE_SIZE) {
        showToast({
          message: uploadError,
          variant: 'error',
        })

        return
      }

      setImagesFilers([file])
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagesPreviews([reader.result]) //
          next()
        }
      }
      reader.readAsDataURL(file)
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
        <BlankImage className={styles.card} height={48} type={'square'} width={48} />
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
