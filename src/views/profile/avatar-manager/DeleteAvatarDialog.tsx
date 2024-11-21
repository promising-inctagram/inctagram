import { Button } from '@/components/ui/button'
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from '@/shared/hooks'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './DeleteAvatarDialog.module.scss'
type Props = {
  isOpen: boolean
  onConfirm: () => void
  onOpenChange: (isOpen: boolean) => void
}
const DeleteAvatarDialog = ({ isOpen, onConfirm, onOpenChange }: Props) => {
  const { t } = useTranslation()
  const closeDialogHandler = () => {
    onOpenChange(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content}>
        <VisuallyHidden asChild>
          <DialogTitle>{t.profile.deleteProfilePhoto}</DialogTitle>
        </VisuallyHidden>
        <DialogHeader className={s.header}>
          <Typography as={'h1'} variant={'h1'}>
            {t.profile.deleteProfilePhoto}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Typography variant={'regular_text_16'}>{t.profile.deletePhotoQuestion}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button className={s.button} onClick={onConfirm} variant={'outlined'}>
            {t.profile.yesButton}
          </Button>
          <Button className={s.button} onClick={closeDialogHandler} variant={'primary'}>
            {t.profile.noButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default DeleteAvatarDialog
