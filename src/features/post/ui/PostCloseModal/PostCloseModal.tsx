import React from 'react'

import {
  Button,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
  Typography,
} from '@/components/ui'
import { CloseIcon } from '@/components/ui/icons'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import s from './PostCloseModal.module.scss'

type PostCloseModalProps = {
  handleDeletePost: () => void
  isOpen: boolean
  onOpenChange: () => void
}

export const PostCloseModal = ({ handleDeletePost, isOpen, onOpenChange }: PostCloseModalProps) => {
  const handleCloseModal = () => {
    handleDeletePost()
    onOpenChange()
  }

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
          <DialogHeader className={s.header}>
            <Typography as={'h1'} variant={'h1'}>
              Delete Post
            </Typography>
            <DialogClose>
              <Button variant={'icon'}>
                <CloseIcon />
              </Button>
            </DialogClose>
          </DialogHeader>
          <DialogBody className={s.body}>
            <Typography variant={'regular_text_16'}>
              Are you sure you want to delete this post?
            </Typography>
            <div className={s.buttonsContainer}>
              <Button className={s.button} onClick={handleCloseModal} variant={'outlined'}>
                Yes
              </Button>
              <Button className={s.button} onClick={onOpenChange} variant={'primary'}>
                No
              </Button>
            </div>
          </DialogBody>
        </DialogContent>
      </DialogOverlay>
    </DialogRoot>
  )
}
