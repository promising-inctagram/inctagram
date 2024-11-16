import React from 'react'

import {
  Button,
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
import { useTranslation } from '@/shared/hooks'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import styles from './CloseModal.module.scss'

type CloseModalProps = {
  closeMainModal: (value: boolean) => void
  isOpen: boolean
  onOpenChange: (value: boolean) => void
  setImages: (value: string[]) => void
  setImagesFilers: (value: File[]) => void
  setStepIndex: (value: number) => void
}

const CloseModal = ({
  closeMainModal,
  isOpen = true,
  onOpenChange,
  setImages,
  setImagesFilers,
  setStepIndex,
}: CloseModalProps) => {
  const { t } = useTranslation()
  const { buttonDiscard, buttonSaveDraft, modalContext, modalTitle, modalWarning } =
    t.createPost.closeModal

  const handleCloseMainModal = () => {
    closeMainModal(false)
    onOpenChange(false)
    setImages([])
    setImagesFilers([])
    setStepIndex(0)
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
            {modalTitle}
          </Typography>
          <DialogClose asChild>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={styles.body}>
          <Typography className={styles.text} variant={'regular_text_16'}>
            {modalContext}
          </Typography>
          <Typography variant={'regular_text_16'}>{modalWarning}</Typography>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => onOpenChange(false)} variant={'outlined'}>
              {buttonDiscard}
            </Button>
            <Button className={styles.button} onClick={handleCloseMainModal} variant={'primary'}>
              {buttonSaveDraft}
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

export default CloseModal
