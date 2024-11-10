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
  setImagesFilers: any
}

const CroppingPhoto = ({ back, images, next, setImages, setImagesFilers }: CroppingPhotoProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const onSubmit = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      setImagesFilers((prev: string[]) => [...prev, file])
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
          Cropping
        </Typography>
        <Button onClick={next} variant={'link'}>
          Next
        </Button>
      </DialogHeader>

      <DialogBody className={styles.body}>
        <Carousel
          className={styles.image}
          onActiveIndexChange={data => console.log(data.activeIndex)}
          slides={images}
        />
        {showModal && (
          <Card className={styles.card}>
            <ScrollArea className={styles.scroll}>
              <div className={styles.imagesContainer}>
                {images.map((elem, index) => (
                  <div className={styles.smallImageContainer} key={`${elem}${index}`}>
                    <img alt={'sad'} className={styles.smallImage} src={elem} />
                    <Button onClick={() => deleteImage(index)} variant={'icon'}>
                      <CloseOutlineIcon className={styles.closeIcon} height={'12'} width={'12'} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button disabled={images.length === 10} onClick={onSubmit} variant={'icon'}>
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
