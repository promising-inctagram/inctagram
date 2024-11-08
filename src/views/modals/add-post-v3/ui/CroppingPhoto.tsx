import React, { useRef, useState } from 'react'

import {
  Button,
  Card,
  Carousel,
  DialogBody,
  DialogHeader,
  ScrollArea,
  Typography,
} from '@/components/ui'
import {
  ArrowIosBackIcon,
  CloseOutlineIcon,
  ImageIcon,
  ImageOutlineIcon,
  PlusCircleOutlineIcon,
} from '@/components/ui/icons'

import styles from './CroppingPhoto.module.scss'

type CroppingPhotoProps = {
  back: () => void
  images: string[]
  next: () => void
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

const CroppingPhoto = ({ back, images, next, setImages }: CroppingPhotoProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const onSubmit = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImages((prev: string[]) => [...prev, reader.result as string])
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleShowModal = () => {
    setShowModal(prev => !prev)
  }

  const deleteImage = (index: number) => {
    setImages(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    if(images.length === 1) back()
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
        <Carousel
          className={styles.image}
          slides={images}
          onActiveIndexChange={data => console.log(data.activeIndex)}
        />
        {showModal && (
          <Card className={styles.card}>
            <ScrollArea className={styles.scroll}>
              <div className={styles.imagesContainer}>
                {images.map((elem, index) => (
                  <div className={styles.smallImageContainer}>
                    <img
                      alt={'sad'}
                      className={styles.smallImage}
                      key={`${elem}${index}`}
                      src={elem}
                    />
                    <Button variant={'icon'} onClick={() => deleteImage(index)}>
                      <CloseOutlineIcon className={styles.closeIcon} height={'12'} width={'12'} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button onClick={onSubmit} variant={'icon'} disabled={images.length === 10}>
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
          <ImageIcon className={styles.icon} height={'36'} width={'36'} />
        </Button>
      </DialogBody>
    </>
  )
}

export default CroppingPhoto
