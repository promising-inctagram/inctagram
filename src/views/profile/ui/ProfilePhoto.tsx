import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { Typography } from '@/components/ui'
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
} from '@/components/ui/dialog/Dialog'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { TextFieldFile } from '@/components/ui/textfieldFile'
import { useUploadAvatarMutation } from '@/shared/api/profile/profile.api'
import { useTranslation } from '@/shared/hooks'

import s from './ProfilePhoto.module.scss'
type Props = { avatar?: null | string }
const ProfilePhoto = ({ avatar }: Props) => {
  const { t } = useTranslation()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const editorRef = useRef<AvatarEditor>(null)
  const [error, setError] = useState('')

  const [uploadAvatar] = useUploadAvatarMutation()
  const [openDelete, setOpenDelete] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)

  const openAddPhotoHandler = (open: boolean) => {
    setOpenAdd(open)
  }
  const handleSetImage = (file: File) => {
    setSelectedImage(file)
  }
  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }
  const handleSaveAvatar = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas()

      if (canvasScaled) {
        canvasScaled.toBlob(blob => {
          if (blob) {
            const timestamp = Date.now()
            const fileName = `photo_${timestamp}.png`
            const file = new File([blob], fileName, { type: 'image/png' })

            setOpenAdd(false)
            // uploadAvatar(file)
            //   .unwrap()
            //   .then(() => {
            //     setSelectedImage(null);
            //     setOpenAdd(false)
            //   })
          } else {
            // toast.error('Select a photo')
          }
        })
      }
    }
  }

  return (
    <>
      <div className={s.root}>
        {avatar ? <Avatar size={'s'} src={avatar} userName={'userAvatar'} /> : <BlankImage />}

        <DialogRoot
          className={s.dialog}
          onOpenChange={openAddPhotoHandler}
          open={openAdd}
          title={t.profileSettingPage.profilePhoto.addProfilePhoto}
        >
          <DialogTrigger asChild>
            {
              <Button variant={'outlined'}>
                {t.profileSettingPage.profilePhoto.addProfilePhoto}
              </Button>
            }
          </DialogTrigger>
          <DialogContent className={s.dialogContent}>
            <DialogHeader className={s.dialogHeader}>
              <DialogTitle>Добавить фото профиля</DialogTitle>
              <DialogClose className={'close-button'}>
                <Button title={'close'} variant={'icon'}>
                  <CloseOutlineIcon />
                </Button>
              </DialogClose>
            </DialogHeader>
            <DialogBody className={s.dialogBody}>
              {selectedImage ? (
                <AvatarEditor
                  backgroundColor={'black'}
                  borderRadius={155}
                  color={[23, 23, 23, 0.6]}
                  crossOrigin={'anonymous'}
                  disableBoundaryChecks={false}
                  height={316}
                  image={selectedImage}
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
                {selectedImage ? (
                  <Button className={s.saveButton} onClick={handleSaveAvatar}>
                    Save
                  </Button>
                ) : (
                  <TextFieldFile setSelectedImage={handleSetImage} />
                )}
              </div>
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      </div>
    </>
  )
}

export default ProfilePhoto
