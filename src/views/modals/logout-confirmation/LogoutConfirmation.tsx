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
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
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
      logoutConfirmation: {
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
        // Также будет зачищаться localstorage

        onOpenChange(false)
        router.push(Paths.logIn)
      })
      .catch(e => {
        showToast({ message: e.data?.errorsMessage, variant: 'error' })
      })
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent
        className={s.content}
        onPointerDownOutside={() => {}}
        overlayClassName={s.overlay}
      >
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
          <Button className={s.button} onClick={() => onOpenChange(false)} variant={'outlined'}>
            {rejectButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
