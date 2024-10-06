import { useEffect, useState } from 'react'

import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  Typography,
  showToast,
} from '@/components/ui'
import { useLogoutMutation } from '@/shared/api/auth/auth.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { getUserData } from '@/views/logout/model/getUserData'
import { useRouter } from 'next/router'

import s from './LogoutConfirmation.module.scss'
type Props = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function LogoutConfirmation({ isOpen, onOpenChange }: Props) {
  const [previousPath, setPreviousPath] = useState<null | string>(null)
  const { email, nickName } = getUserData() // где-то надо доставать данные о пользователе
  const [logout, { isLoading }] = useLogoutMutation()
  const router = useRouter()
  const {
    t: {
      logoutConfirmation: { confirmButton, confirmationMessage, rejectButton },
    },
  } = useTranslation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPreviousPath = localStorage.getItem('previousPath')

      setPreviousPath(storedPreviousPath)
    }
  }, [])

  const confirmButtonHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        onOpenChange(false)
        router.push(Paths.logIn)
      })
      .catch(e => {
        showToast({ message: e.data?.errorsMessage, variant: 'error' })

        if (previousPath) {
          router.push(previousPath)
        }
      })
  }

  const rejectOrOutsideClick = () => {
    if (previousPath) {
      router.push(previousPath)
    }
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent
        className={s.content}
        onPointerDownOutside={rejectOrOutsideClick}
        overlayClassName={s.overlay}
      >
        <DialogHeader className={s.header}>
          <Typography as={'h3'} variant={'h3'}>
            {confirmationMessage}
          </Typography>
          <Typography>
            {email} {nickName}?
          </Typography>
        </DialogHeader>
        <DialogFooter className={s.footer}>
          <Button
            className={s.button}
            disabled={isLoading}
            onClick={confirmButtonHandler}
            variant={'primary'}
          >
            {confirmButton}
          </Button>
          <Button className={s.button} onClick={rejectOrOutsideClick} variant={'outlined'}>
            {rejectButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
