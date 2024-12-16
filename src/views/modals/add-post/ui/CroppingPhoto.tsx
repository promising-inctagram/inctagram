import React, { useRef, useState } from 'react'

import {
  Button,
  Card,
  Carousel,
  DialogBody,
  DialogHeader,
  ScrollArea,
  Typography,
  showToast,
} from '@/components/ui'
import { ArrowIosBackIcon, ImageIcon } from '@/components/ui/icons'
import { MAX_POST_FILE_SIZE, POST_FILE_TYPES } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import clsx from 'clsx'

import styles from './CroppingPhoto.module.scss'

import PhotoCarouselModal from './modal/PhotoCarouselModal'

type CroppingPhotoProps = {
  back: () => void
  imagesPreviews: string[]
  next: () => void
  setImagesFilers: React.Dispatch<React.SetStateAction<File[]>>
  setImagesPreviews: React.Dispatch<React.SetStateAction<string[]>>
}

const CroppingPhoto = ({
  back,
  imagesPreviews,
  next,
  setImagesFilers,
  setImagesPreviews,
}: CroppingPhotoProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { t } = useTranslation()
  const { modalButton, modalTitle, typeImageError, uploadError } = t.createPost.croppingPhoto

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

      setImagesFilers(prev => [...prev, file])
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagesPreviews((prev: string[]) => [...prev, reader.result as string])
        }
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  const handleShowModal = () => {
    setShowModal(prev => !prev)
  }

  const deleteImage = (index: number) => {
    setImagesPreviews(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    setImagesFilers(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    if (imagesPreviews.length === 1) {
      back()
    }
  }

  return (
    <>
      <DialogHeader className={styles.header}>
        <Button onClick={back} variant={'icon'}>
          <ArrowIosBackIcon />
        </Button>
        <Typography as={'h1'} variant={'h1'}>
          {modalTitle}
        </Typography>
        <Button onClick={next} variant={'link'}>
          {modalButton}
        </Button>
      </DialogHeader>

      <DialogBody className={styles.body}>
        <Carousel className={styles.image} slides={imagesPreviews} />
        {showModal && (
          <PhotoCarouselModal
            deleteImage={deleteImage}
            handleFileChange={handleFileChange}
            imagesPreviews={imagesPreviews}
          />
        )}
        <Button onClick={handleShowModal} variant={'icon'}>
          <ImageIcon
            className={clsx(styles.icon, showModal && styles.iconActive)}
            height={'36'}
            width={'36'}
          />
        </Button>
      </DialogBody>
    </>
  )
}

export default CroppingPhoto
