import React, { useState } from 'react'

import { Button, Carousel, DialogBody, DialogHeader, Typography } from '@/components/ui'
import { ArrowIosBackIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'
import { FilterParams } from '@/views/modals/add-post/ui/filterRarams/FilterParams'

import s from './FilterPost.module.scss'
import styles from '@/views/modals/add-post/ui/CroppingPhoto.module.scss'

type FilterPostProps = {
  back: () => void
  imagesFiles: File[]
  imagesPreviews: string[]
  isBack: boolean
  next: () => void
  setImagesFilers: React.Dispatch<React.SetStateAction<File[]>>
  setImagesPreviews: React.Dispatch<React.SetStateAction<string[]>>
}

export const FilterPost = ({
  back,
  imagesFiles,
  imagesPreviews,
  isBack,
  next,
  setImagesFilers,
  setImagesPreviews,
}: FilterPostProps) => {
  const { t } = useTranslation()
  const { modalButton, modalTitle } = t.createPost.filterPhoto

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

      <DialogBody className={styles.body + ' ' + s.filterPhotoWrapper}>
        <span>
          <Carousel className={s.filterPhoto} slides={imagesPreviews} />
        </span>
        <div className={s.filtersMenu}>
          <FilterParams
            imagesFiles={imagesFiles}
            imagesPreviews={imagesPreviews}
            isBack={isBack}
            setImagesFilers={setImagesFilers}
            setImagesPreviews={setImagesPreviews}
          />
        </div>
      </DialogBody>
    </>
  )
}
