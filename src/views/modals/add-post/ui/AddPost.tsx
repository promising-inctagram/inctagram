import React, { useState } from 'react'

import { getSidebarLayout } from '@/components'
import {
  Button,
  Card,
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
import { CloseOutlineIcon, ImageOutlineIcon } from '@/components/ui/icons'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import styles from './AddPost.module.scss'

function AddPost() {
  const [isOpen, setIsOpen] = useState(true)
  const onOpenChange = () => {
    setIsOpen(prev => !prev)
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
            Add photo
          </Typography>
          <DialogClose>
            <Button title={'close'} variant={'icon'}>
              <CloseOutlineIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody className={styles.body}>
          <Card className={styles.card}>
            <ImageOutlineIcon height={'48'} width={'48'} />
          </Card>
          <Button className={styles.button}>Select from computer</Button>
          <Button className={styles.button} variant={'outlined'}>
            Open draft
          </Button>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}

AddPost.getLayout = getSidebarLayout
export default AddPost
