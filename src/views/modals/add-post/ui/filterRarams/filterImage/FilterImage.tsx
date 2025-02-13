import React from 'react'

import image from '@/assets/webp/dummy-image.webp'

import s from '@/views/modals/add-post/ui/filterRarams/FilterParams.module.scss'

type FilterImageProps = {
  applyFilter: (value: string) => void
  filter: string
  value: string
}

export const FilterImage = ({ applyFilter, filter, value }: FilterImageProps) => {
  return (
    <div className={s.wrapperFilterImage} onClick={() => applyFilter(filter)}>
      <img alt={'original'} className={s.filterImage + ' ' + s[filter]} src={image.src} />
      <p className={s.imageValue}>{value}</p>
    </div>
  )
}
