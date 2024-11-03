import React, { ReactElement, useState } from 'react'

import { getSidebarLayout } from '@/components'
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
} from '@/components/ui'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import styles from './AddPost.module.scss'

import AddDescription from './AddDescription'
import CroppingPhoto from './CroppingPhoto'
import UploadPhoto from './UploadPhoto'
import CloseModal from './modal/CloseModal'

type AddPostProps = {
  isOpen: boolean
  onOpenChange: () => void
}

function AddPost({ isOpen = true, onOpenChange }: AddPostProps) {
  const [images, setImages] = useState<string[]>([])
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [isOpenCloseModal, setIsOpenCloseModal] = useState<boolean>(false)

  const next = () => {
    setStepIndex(i => i + 1)
  }

  const back = () => {
    setStepIndex(i => i - 1)
  }

  const handleOpenCloseModal = e => {
    if (e.target.className === 'Dialog_overlay__ptaiT') {
      setIsOpenCloseModal(true)
    }
  }

  const steps: ReactElement[] = [
    <UploadPhoto key={'upload'} next={next} setImages={setImages} />,
    <CroppingPhoto
      back={back}
      images={images}
      key={'cropping'}
      next={next}
      setImages={setImages}
    />,
    <AddDescription back={back} images={images} key={'desctiption'} />,
  ]

  return (
    <DialogRoot onOpenChange={onOpenChange} open={isOpen}>
      <DialogOverlay onClick={e => handleOpenCloseModal(e)}>
        <DialogContent className={styles.content}>
          <VisuallyHidden asChild>
            <DialogTitle>VisuallyHidden</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription>DialogDescription</DialogDescription>
          </VisuallyHidden>
          {steps[stepIndex]}
          <CloseModal
            closeMainModal={onOpenChange}
            isOpen={isOpenCloseModal}
            onOpenChange={setIsOpenCloseModal}
          />
        </DialogContent>
      </DialogOverlay>
    </DialogRoot>
  )
}

AddPost.getLayout = getSidebarLayout
export default AddPost
