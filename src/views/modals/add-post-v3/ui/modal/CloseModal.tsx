import React from 'react'

import {
  Button,
  Card,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Typography,
} from '@/components/ui'
import { CloseOutlineIcon } from '@/components/ui/icons'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import styles from './CloseModal.module.scss'

type CloseModalProps = {
  closeMainModal: (value: boolean) => void
  isOpen: boolean
  onOpenChange: () => void
}

const CloseModal = ({ closeMainModal, isOpen = true, onOpenChange }: CloseModalProps) => {
  const handleCloseMainModal = () => {
    closeMainModal(false)
  }

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className={styles.content}>
        <VisuallyHidden asChild>
          <DialogTitle>тайтл</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>висуалити хедер дескриптион</DialogDescription>
        </VisuallyHidden>
        <DialogHeader className={styles.header}>
          <Typography as={'h1'} variant={'h1'}>
            Close
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={styles.body}>
          <Typography className={styles.text} variant={'regular_text_16'}>
            Do you really want to close the creation of a publication?
          </Typography>
          <Typography variant={'regular_text_16'}>
            If you close everything willbe deleted
          </Typography>
          <div className={styles.buttonsContainer}>
            <Button onClick={handleCloseMainModal} variant={'outlined'}>
              Discard
            </Button>
            <Button variant={'primary'}>Save draft</Button>
          </div>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

export default CloseModal
