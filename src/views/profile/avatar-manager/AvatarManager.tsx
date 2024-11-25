import { ChangeEvent, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { Avatar } from '@/components/ui/avatar'
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
import { useDeleteAvatarMutation, useUploadAvatarMutation } from '@/shared/api/profile/profile.api'
import { ALLOWED_FILE_TYPES, AVATAR_MAX_FILE_SIZE } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import DeleteAvatarDialog from '@/views/profile/avatar-manager/DeleteAvatarDialog'
import * as Slider from '@radix-ui/react-slider'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './AvatarManager.module.scss'

type Props = { avatar: string }

const AvatarManager = ({ avatar }: Props) => {
  const { t } = useTranslation()
  const editorRef = useRef<AvatarEditor>(null)
  const [slideValue, setSlideValue] = useState<number>(10)
  const [avatarFile, setAvatarFile] = useState<File | string>(null)
  const [uploadAvatar] = useUploadAvatarMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })

  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const onOpenChangeHandler = (open: boolean) => {
    setIsDialogOpen(open)
    setUploadSuccess(false)
    setErrorMsg('')
    setAvatarFile(avatar ?? null)
  }
  const onSliderChange = (value: number) => {
    setSlideValue(value)
  }
  const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      setErrorMsg('')
      const file = e.target.files[0]
      const avatarUrl = URL.createObjectURL(file)

      if (file.size >= AVATAR_MAX_FILE_SIZE) {
        setErrorMsg(t.profile.avatarSizeError)

        return
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setErrorMsg(t.profile.avatarTypeError)

        return
      }
      if (!uploadSuccess) {
        setUploadSuccess(true)
        setAvatarFile(avatarUrl)
      }
    }
  }
  const onSaveAvatarHandler = async () => {
    try {
      if (editorRef.current) {
        const canvas = editorRef.current?.getImageScaledToCanvas()

        if (canvas) {
          canvas.toBlob(async blob => {
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
  const onDeleteAvatarHandler = async () => {
    try {
      await deleteAvatar().unwrap()
      setIsDeleteDialogOpen(false)
      setAvatarFile(null)
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
    <div className={s.root}>
      {avatar ? (
        <div className={s.avatar}>
          <div className={s.deleteBtnWrapper}>
            <Button
              className={s.deleteBtn}
              onClick={setIsDeleteDialogOpen}
              title={t.profile.deleteProfilePhoto}
              variant={'icon'}
            >
              <CloseOutlineIcon className={s.closeIcon} />
            </Button>
          </div>
          <Avatar size={'s'} src={avatar} userName={'userAvatar'} />
        </div>
      ) : (
        <BlankImage />
      )}
      <DeleteAvatarDialog
        isOpen={isDeleteDialogOpen}
        onConfirm={onDeleteAvatarHandler}
        onOpenChange={setIsDeleteDialogOpen}
      />
      <DialogRoot
        onOpenChange={onOpenChangeHandler}
        open={isDialogOpen}
        title={t.profile.addProfilePhoto}
      >
        <DialogTrigger asChild>
          {<Button variant={'outlined'}>{t.profile.addProfilePhoto}</Button>}
        </DialogTrigger>
        <DialogContent className={s.dialogContent}>
          <VisuallyHidden>
            <DialogTitle>{t.profile.addProfilePhoto}</DialogTitle>
          </VisuallyHidden>
          <DialogHeader className={s.dialogHeader}>
            <Typography as={'h3'} variant={'h3'}>
              {t.profile.addProfilePhoto}
            </Typography>
            <DialogClose className={'close-button'}>
              <Button title={t.profile.closeButton} variant={'icon'}>
                <CloseOutlineIcon />
              </Button>
            </DialogClose>
          </DialogHeader>
          <DialogBody className={s.dialogBody}>
            {avatarFile ? (
              <>
                <AvatarEditor
                  backgroundColor={'black'}
                  borderRadius={155}
                  color={[23, 23, 23, 0.6]}
                  disableBoundaryChecks={false}
                  height={316}
                  image={avatarFile}
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
                <BlankImage className={s.blankImage} type={'square'} />
              </div>
            )}
            <div className={s.btnWrapper}>
              {uploadSuccess ? (
                <Button onClick={onSaveAvatarHandler}>{t.profile.savePhoto}</Button>
              ) : (
                <Button as={'label'} className={s.fileBtn} variant={'primary'}>
                  <input
                    accept={'image/png,image/jpg,image/jpeg'}
                    hidden
                    onChange={onUploadHandler}
                    type={'file'}
                  />
                  {t.profile.selectPhoto}
                </Button>
              )}
            </div>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </div>
  )
}

export default AvatarManager
