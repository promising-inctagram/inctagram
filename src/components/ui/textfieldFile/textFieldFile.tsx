import { ChangeEvent, ComponentPropsWithoutRef, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from '@/shared/hooks'

import s from './textfield.module.scss'
type Props = {
  setSelectedImage: (image: File) => void
} & ComponentPropsWithoutRef<'input'>
export const TextFieldFile = ({ setSelectedImage, ...rest }: Props) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setSelectedImage(file)
    }
  }

  return (
    <div>
      <Button className={s.btn} onClick={selectFileHandler} variant={'primary'}>
        <Typography variant={'h3'}>{t.profileSettingPage.profilePhoto.selectPhoto}</Typography>
      </Button>
      <input
        accept={'image/png,image/jpg, image/jpeg'}
        className={s.input}
        onChange={uploadHandler}
        ref={inputRef}
        type={'file'}
        {...rest}
      />
    </div>
  )
}
