import {
  Button,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Typography,
} from '@/components/ui'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { LocaleEmailSentDialog } from '@/locales/en'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './SentEmailDialog.module.scss'

type SentEmailDialogProps = {
  email: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  overlayStyles: string
  t: LocaleEmailSentDialog
}
export const SentEmailDialog = ({
  email,
  isOpen,
  onOpenChange,
  overlayStyles,
  t,
}: SentEmailDialogProps) => {
  const confirmButtonHandler = () => {
    onOpenChange(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content} overlayClassName={overlayStyles}>
        <VisuallyHidden asChild>
          <DialogTitle>{t.accessibilityTitle}</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>{t.accessibilityDescription}</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={s.header}>
          <Typography as={'h1'} variant={'h1'}>
            {t.visibleTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <Typography variant={'regular_text_16'}>{`${t.visibleBodyText} ${email}`}</Typography>
        </DialogBody>
        <DialogFooter className={s.footer}>
          <Button className={s.button} onClick={confirmButtonHandler} variant={'primary'}>
            {t.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
