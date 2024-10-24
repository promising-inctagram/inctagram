import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Typography,
  showToast,
} from '@/components/ui'
import { useLogoutMutation } from '@/shared/api/auth/auth.api'
import { ACCESS_TOKEN } from '@/shared/constants'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useRouter } from 'next/router'

import s from './LogoutConfirmation.module.scss'
type Props = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function LogoutConfirmation({ isOpen, onOpenChange }: Props) {
  const [logout, { isLoading }] = useLogoutMutation()
  const {
    t: {
      confirmLogoutPage: {
        accessibilityDescription,
        accessibilityTitle,
        confirmButton,
        confirmationMessage,
        rejectButton,
      },
    },
  } = useTranslation()
  const router = useRouter()

  const logoutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        localStorage.removeItem(ACCESS_TOKEN)

        router.push(Paths.logIn)
      })
      .catch(e => {
        const error = getErrorMessageData(e)

        if (typeof error !== 'string') {
          error.forEach(el => {
            showToast({ message: el.message, variant: 'error' })
          })
        } else {
          showToast({ message: error, variant: 'error' })
        }
      })
      .finally(() => {
        closeHandler()
      })
  }

  const closeHandler = () => {
    onOpenChange(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={s.content}>
        <VisuallyHidden asChild>
          <DialogTitle>{accessibilityTitle}</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>{accessibilityDescription}</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {confirmationMessage}
          </Typography>
          <Typography>___email name___?</Typography>
        </DialogHeader>
        <DialogFooter className={s.footer}>
          <Button
            className={s.button}
            disabled={isLoading}
            onClick={logoutHandler}
            variant={'primary'}
          >
            {confirmButton}
          </Button>
          <Button className={s.button} onClick={closeHandler} variant={'outlined'}>
            {rejectButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
