import React, { useRef, useState } from 'react'

import { Button, Card, Carousel, DialogBody, DialogHeader, Typography } from '@/components/ui'
import { ArrowIosBackIcon, ImageOutlineIcon, PlusCircleOutlineIcon } from '@/components/ui/icons'

import styles from './CroppingPhoto.module.scss'

type CroppingPhotoProps = {
  back: () => void
  images: string[]
  next: () => void
  setImages: () => any
}

const CroppingPhoto = ({ back, images, next, setImages }: CroppingPhotoProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const fileInputRef = useRef(null)
  const onSubmit = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImages((prev: string[]) => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleShowModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <>
      <DialogHeader className={styles.header}>
        <Button onClick={back} variant={'icon'}>
          <ArrowIosBackIcon />
        </Button>
        <Typography as={'h1'} variant={'h1'}>
          Cropping
        </Typography>
        <Button onClick={next} variant={'link'}>
          Next
        </Button>
      </DialogHeader>

      <DialogBody className={styles.body}>
        <Carousel className={styles.image} slides={images} />
        {showModal && (
          <Card className={styles.card}>
            {images.map((elem, index) => (
              <img alt={'sad'} className={styles.smallImage} key={`${elem}${index}`} src={elem} />
            ))}
            <Button onClick={onSubmit} variant={'icon'}>
              <PlusCircleOutlineIcon height={'36'} width={'36'} />
            </Button>
            <input
              onChange={e => handleFileChange(e)}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          </Card>
        )}
        <Button onClick={handleShowModal} variant={'icon'}>
          <ImageOutlineIcon className={styles.icon} height={'36'} width={'36'} />
        </Button>
      </DialogBody>
    </>
  )
}

export default CroppingPhoto
