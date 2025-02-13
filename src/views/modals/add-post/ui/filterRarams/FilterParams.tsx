import React from 'react'

import { Carousel } from '@/components/ui'
import { FilterImage } from '@/views/modals/add-post/ui/filterRarams/filterImage/FilterImage'
import { useFilterParams } from '@/views/modals/add-post/ui/filterRarams/useFilterParams'

import s from './FilterParams.module.scss'

const orderedKeys = [
  'original',
  'grayscale',
  'invert',
  'sepia',
  'brightness',
  'contrast',
  'pixelate',
] as const

type FilterParamsProps = {
  imagesFiles: File[]
  imagesPreviews: string[]
  isBack: boolean
  setImagesFilers: React.Dispatch<React.SetStateAction<File[]>>
  setImagesPreviews: React.Dispatch<React.SetStateAction<string[]>>
}

export const FilterParams = ({
  imagesFiles,
  imagesPreviews,
  isBack,
  setImagesFilers,
  setImagesPreviews,
}: FilterParamsProps) => {
  const { applyFilter, canvasRef, getSlideHandler, t } = useFilterParams({
    imagesFiles,
    imagesPreviews,
    isBack,
    setImagesFilers,
    setImagesPreviews,
  })

  const values = t.createPost.filterPhoto.filterValues

  return (
    <div className={s.blockFilterParams}>
      <div className={s.FilterParamsPhoto}>
        <Carousel getSlide={getSlideHandler} slides={imagesPreviews || ['']} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      <div className={s.wrapperFilterImages}>
        {orderedKeys.map((key, i) => (
          <FilterImage applyFilter={applyFilter} filter={key} key={i} value={values[key]} />
        ))}
      </div>
    </div>
  )
}
