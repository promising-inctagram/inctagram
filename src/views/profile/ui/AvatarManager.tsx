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
  DialogTrigger,
} from '@/components/ui/dialog'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { Typography } from '@/components/ui/typography'
import { useDeleteAvatarMutation, useUploadAvatarMutation } from '@/shared/api/profile/profile.api'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'

import s from './AvatarManager.module.scss'
type Props = { avatar: string | undefined }

const AvatarManager = ({ avatar }: Props) => {
  const { t } = useTranslation()
  const editorRef = useRef<AvatarEditor>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const [error, setError] = useState('')

  const [uploadAvatar] = useUploadAvatarMutation()
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const onOpenChangeHandler = (open: boolean) => {
    setIsDialogOpen(open)
    setUploadSuccess(false)
  }
  const onSaveAvatarHandler = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()

      if (canvas) {
        canvas.toBlob(async blob => {
          if (blob) {
            const timestamp = Date.now()
            const fileName = `avatar${timestamp}.png`
            const file = new File([blob], fileName, { type: blob.type })

            try {
              await uploadAvatar({ file: file })
                .unwrap()
                .then(() => {
                  setAvatarFile(null)
                  setIsDialogOpen(false)
                  setUploadSuccess(false)
                })
            } catch (e) {
              const errors = getErrorMessageData(e)
              // toast.error('errors')
            }
          } else {
            // toast.error('Select a photo')
          }
        })
      }
    }
  }
  const onUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!uploadSuccess) {
        setUploadSuccess(true)
        setAvatarFile(file)
      }
    }

    return
  }

  return (
    <div className={s.root}>
      {avatar ? <Avatar size={'s'} src={avatar} userName={'userAvatar'} /> : <BlankImage />}

      <DialogRoot
        onOpenChange={onOpenChangeHandler}
        open={isDialogOpen}
        title={t.profilePage.addProfilePhoto}
      >
        <DialogTrigger asChild>
          {<Button variant={'outlined'}>{t.profilePage.addProfilePhoto}</Button>}
        </DialogTrigger>
        <DialogContent className={s.dialogContent}>
          <DialogHeader className={s.dialogHeader}>
            <Typography variant={'h3'}>{t.profilePage.addProfilePhoto}</Typography>
            <DialogClose className={'close-button'}>
              <Button title={t.profilePage.closeButton} variant={'icon'}>
                <CloseOutlineIcon />
              </Button>
            </DialogClose>
          </DialogHeader>
          <DialogBody className={s.dialogBody}>
            {avatarFile ? (
              <AvatarEditor
                backgroundColor={'black'}
                borderRadius={155}
                color={[23, 23, 23, 0.6]}
                crossOrigin={'anonymous'}
                disableBoundaryChecks={false}
                height={316}
                image={avatarFile}
                onPositionChange={handlePositionChange}
                position={position}
                ref={editorRef}
                scale={1}
                width={316}
              />
            ) : (
              <BlankImage className={s.blankImage} type={'square'} />
            )}
            <div>
              {uploadSuccess ? (
                <Button className={s.saveButton} onClick={onSaveAvatarHandler}>
                  {t.profilePage.savePhoto}
                </Button>
              ) : (
                <Button as={'label'} className={s.fileBtn} variant={'primary'}>
                  <input
                    accept={'image/png,image/jpg, image/jpeg'}
                    hidden
                    onChange={onUploadHandler}
                    type={'file'}
                  />
                  {t.profilePage.selectPhoto}
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
