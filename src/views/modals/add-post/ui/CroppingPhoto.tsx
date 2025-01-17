import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { Button, Carousel, DialogBody, DialogHeader, Typography, showToast } from '@/components/ui'
import {
  ArrowIosBackIcon,
  ImageIcon,
  MaximizeIcon,
  MaximizeOutlineIcon,
} from '@/components/ui/icons'
import { MAX_POST_FILE_SIZE, POST_FILE_TYPES } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import { CarouselD } from '@/views/modals/add-post/ui/DDD'
import ImageEditor from '@/views/modals/add-post/ui/ImageEditor'
import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'

import styles from './CroppingPhoto.module.scss'
import s from '@/views/profile/avatar-manager/ui/AvatarDialog.module.scss'

import PhotoCarouselModal from './modal/PhotoCarouselModal'

type CroppingPhotoProps = {
  back: () => void
  imagesPreviews: string[]
  next: () => void
  setImagesFilers: Dispatch<SetStateAction<File[]>>
  setImagesPreviews: Dispatch<SetStateAction<string[]>>
}

const CroppingPhoto = ({
  back,
  imagesPreviews,
  next,
  setImagesFilers,
  setImagesPreviews,
}: CroppingPhotoProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showZoom, setShowZoom] = useState<boolean>(false)
  const [slideValue, setSlideValue] = useState<number>(10)
  const { t } = useTranslation()
  const { modalButton, modalTitle, typeImageError, uploadError } = t.createPost.croppingPhoto

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleShowZoom = () => {
    setShowZoom(prev => !prev)
  }

  const deleteImage = (index: number) => {
    setImagesPreviews(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    setImagesFilers(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    if (imagesPreviews.length === 1) {
      back()
    }
  }

  const onSliderChange = (value: number | number[]) => {
    setSlideValue(value as number)
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
        {showZoom ? (
          /*<>
            <ImageEditor
              imagesPreviews={imagesPreviews}
              setImagesPreviews={setImagesPreviews}
              setShowZoom={setShowZoom}
              slideValue={slideValue}
            />
            <form>
              <Slider.Root
                className={s.sliderRoot}
                defaultValue={[slideValue]}
                max={50}
                min={10}
                onValueChange={onSliderChange}
                step={2}
                value={[slideValue]}
              >
                <Slider.Track className={s.track}>
                  <Slider.Range className={s.range} />
                </Slider.Track>
                <Slider.Thumb aria-label={'Volume'} className={s.thumb} />
              </Slider.Root>
            </form>
          </>*/
          <CarouselD slides={imagesPreviews} />
        ) : (
          <Carousel className={styles.image} slides={imagesPreviews} />
        )}
        {showModal && (
          <PhotoCarouselModal
            deleteImage={deleteImage}
            handleFileChange={handleFileChange}
            imagesPreviews={imagesPreviews}
          />
        )}
        <Button onClick={handleShowZoom} variant={'icon'}>
          {showZoom ? (
            <MaximizeIcon className={clsx(styles.icon, styles.maximizeIcon, styles.iconActive)} />
          ) : (
            <MaximizeOutlineIcon className={clsx(styles.icon, styles.maximizeIcon)} />
          )}
        </Button>
        <Button onClick={handleShowModal} variant={'icon'}>
          <ImageIcon
            className={clsx(styles.icon, styles.imageIcon, showModal && styles.iconActive)}
          />
        </Button>
      </DialogBody>
    </>
  )
}

export default CroppingPhoto
