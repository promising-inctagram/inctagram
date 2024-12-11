import { useState } from 'react'

import { AlertDialog } from '@/components/alert-dialog/AlertDialog'
import { Avatar } from '@/components/ui/avatar'
import { BlankImage } from '@/components/ui/blankImage'
import { Button } from '@/components/ui/button'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { showToast } from '@/components/ui/toast'
import { useDeleteAvatarMutation } from '@/shared/api/profile/profile.api'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { AvatarDialog } from '@/views/profile/avatar-manager/ui/AvatarDialog'

import s from './AvatarManager.module.scss'

type Props = { avatar: string }

const AvatarManager = ({ avatar }: Props) => {
  const { t } = useTranslation()
  const [deleteAvatar] = useDeleteAvatarMutation()
  const [openDelete, setOpenDelete] = useState(false)

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap()
      setOpenDelete(false)
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
              onClick={setOpenDelete}
              title={t.profileSettingPage.deletePhoto.dialogTitle}
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
      <AvatarDialog avatar={avatar} />
      {openDelete && (
        <AlertDialog
          confirmCallback={handleDeleteAvatar}
          onOpenChange={setOpenDelete}
          open={openDelete}
          t={t.profileSettingPage.deletePhoto}
        />
      )}
    </div>
  )
}

export default AvatarManager
