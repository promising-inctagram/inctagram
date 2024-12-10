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
import {
  ArrowIosBackIcon,
  CloseOutlineIcon,
  ImageIcon,
  PlusCircleOutlineIcon,
} from '@/components/ui/icons'
import { MAX_POST_FILE_SIZE } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import clsx from 'clsx'

import styles from './CroppingPhoto.module.scss'

import PhotoCarouselModal from './modal/PhotoCarouselModal'

type CroppingPhotoProps = {
  back: () => void
  images: string[]
  next: () => void
  setImages: React.Dispatch<React.SetStateAction<string[]>>
  setImagesFilers: React.Dispatch<React.SetStateAction<File[]>>
}

const CroppingPhoto = ({ back, images, next, setImages, setImagesFilers }: CroppingPhotoProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { t } = useTranslation()
  const { modalButton, modalTitle, uploadError } = t.createPost.croppingPhoto

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      if (file.size < MAX_POST_FILE_SIZE) {
        setImagesFilers(prev => [...prev, file])
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setImages((prev: string[]) => [...prev, reader.result as string])
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
    e.target.value = ''
  }

  const handleShowModal = () => {
    setShowModal(prev => !prev)
  }

  const deleteImage = (index: number) => {
    setImages(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    setImagesFilers(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    if (images.length === 1) {
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
        <Carousel className={styles.image} slides={images} />
        {showModal && (
          <PhotoCarouselModal
            deleteImage={deleteImage}
            handleFileChange={handleFileChange}
            images={images}
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
