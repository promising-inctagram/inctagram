import React, { ReactNode } from 'react'

import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
} from '@/components/ui'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './PostWrapper.module.scss'

type PostWrapperProps = {
  children: ReactNode
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}

export const PostWrapper = ({ children, isOpen, onOpenChange }: PostWrapperProps) => {
  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogOverlay>
        <DialogContent className={s.content}>
          <VisuallyHidden asChild>
            <DialogTitle>{'Profile Post Modal'}</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription>{'Profile Post Modal'}</DialogDescription>
          </VisuallyHidden>
          <DialogBody className={s.body}>{children}</DialogBody>
        </DialogContent>
      </DialogOverlay>
    </DialogRoot>
  )
}
