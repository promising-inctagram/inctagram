import { ChangeEvent, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { BlankImage } from '@/components/ui/blankImage'
import { Button } from '@/components/ui/button'
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { showToast } from '@/components/ui/toast'
import { Typography } from '@/components/ui/typography'
import { useUploadAvatarMutation } from '@/shared/api/profile/profile.api'
import { ALLOWED_FILE_TYPES, AVATAR_MAX_FILE_SIZE } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import * as Slider from '@radix-ui/react-slider'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from '@/views/profile/avatar-manager/ui/AvatarDialog.module.scss'
type Props = { avatar: string }

export const AvatarDialog = ({ avatar }: Props) => {
  const { t } = useTranslation()
  const editorRef = useRef<AvatarEditor>(null)
  const [avatarUrl, setAvatarUrl] = useState<null | string>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [slideValue, setSlideValue] = useState<number>(10)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadAvatar] = useUploadAvatarMutation()
  const [errorMsg, setErrorMsg] = useState('')
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })

  const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      setErrorMsg('')
      const file = e.target.files[0]
      const avatarUrl = URL.createObjectURL(file)

      if (file.size >= AVATAR_MAX_FILE_SIZE) {
        setErrorMsg(t.profileSettingPage.profilePhoto.avatarSizeError)

        return
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setErrorMsg(t.profileSettingPage.profilePhoto.avatarTypeError)

        return
      }
      if (!uploadSuccess) {
        setUploadSuccess(true)
        setAvatarUrl(avatarUrl)
      }
    }
  }

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }

  const onOpenChangeHandler = (open: boolean) => {
    setIsDialogOpen(open)
    setUploadSuccess(false)
    setErrorMsg('')
    setAvatarUrl(avatar ?? null)
  }

  const onSliderChange = (value: number | number[]) => {
    setSlideValue(value as number)
  }

  const onSaveAvatarHandler = async () => {
    try {
      if (editorRef.current) {
        const canvas = editorRef.current?.getImageScaledToCanvas()

        if (canvas) {
          canvas.toBlob(async (blob: Blob | null) => {
            if (blob) {
              const timestamp = Date.now()
              const fileName = `avatar${timestamp}.png`
              const file = new File([blob], fileName, { type: blob.type })

              await uploadAvatar({ file: file })
                .unwrap()
                .then(() => {
                  setIsDialogOpen(false)
                  setUploadSuccess(false)
                })
            }
          })
        }
      }
    } catch (e) {
      const errors = getErrorMessageData(e)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          showToast({
            message: el.message,
            variant: 'error',
          })
        })
      }
    }
  }

  return (
    <DialogRoot onOpenChange={onOpenChangeHandler} open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={'outlined'}>{t.profileSettingPage.profilePhoto.addProfilePhoto}</Button>
      </DialogTrigger>
      <DialogContent className={s.dialogContent}>
        <VisuallyHidden>
          <DialogTitle>{t.profileSettingPage.profilePhoto.addProfilePhoto}</DialogTitle>
        </VisuallyHidden>
        <DialogHeader className={s.dialogHeader}>
          <Typography as={'h3'} variant={'h3'}>
            {t.profileSettingPage.profilePhoto.addProfilePhoto}
          </Typography>
          <DialogClose className={'close-button'}>
            <Button title={t.profileSettingPage.profilePhoto.closeButton} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={s.dialogBody}>
          {avatarUrl ? (
            <>
              <AvatarEditor
                backgroundColor={'black'}
                borderRadius={155}
                color={[23, 23, 23, 0.6]}
                disableBoundaryChecks={false}
                height={316}
                image={avatarUrl}
                onPositionChange={handlePositionChange}
                position={position}
                ref={editorRef}
                scale={slideValue / 10}
                width={316}
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
            </>
          ) : (
            <div className={s.blankImageContainer}>
              {errorMsg && (
                <div className={s.errorContainer}>
                  <Typography className={s.error} color={'primary'} variant={'bold_text_14'}>
                    {errorMsg}
                  </Typography>
                </div>
              )}
              <BlankImage className={s.blankImage} height={36} type={'square'} width={36} />
            </div>
          )}
          <div>
            {uploadSuccess ? (
              <Button onClick={onSaveAvatarHandler}>
                {t.profileSettingPage.profilePhoto.savePhoto}
              </Button>
            ) : (
              <Button as={'label'} className={s.fileBtn} variant={'primary'}>
                <input
                  accept={'image/png,image/jpg,image/jpeg'}
                  hidden
                  onChange={onUploadHandler}
                  type={'file'}
                />
                {t.profileSettingPage.profilePhoto.selectPhoto}
              </Button>
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
