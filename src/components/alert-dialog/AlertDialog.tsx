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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './AlertDialog.module.scss'

type Translations = {
  bodyTitle: string
  dialogTitle: string
  noButton: string
  yesButton: string
}
type Props = {
  confirmCallback: () => void
  onOpenChange: (isOpen: boolean) => void
  open: boolean
  t: Translations
}

export const AlertDialog = ({ confirmCallback, onOpenChange, open, t }: Props) => {
  const closeDialogHandler = () => {
    onOpenChange(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={open}>
      <DialogContent className={s.content}>
        <VisuallyHidden asChild>
          <DialogTitle>{t.dialogTitle}</DialogTitle>
        </VisuallyHidden>
        <DialogHeader className={s.header}>
          <Typography as={'h1'} variant={'h1'}>
            {t.dialogTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={s.body}>
          <Typography variant={'regular_text_16'}>{t.bodyTitle}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button className={s.button} onClick={confirmCallback} variant={'outlined'}>
            {t.yesButton}
          </Button>
          <Button className={s.button} onClick={closeDialogHandler} variant={'primary'}>
            {t.noButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
