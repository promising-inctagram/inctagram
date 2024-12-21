import React, { ReactElement, useMemo, useRef, useState } from 'react'

import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
} from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import styles from './AddPost.module.scss'

import AddDescription from './AddDescription'
import CroppingPhoto from './CroppingPhoto'
import UploadPhoto from './UploadPhoto'
import CloseModal from './modal/CloseModal'

type AddPostProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

function AddPost({ isOpen, onOpenChange }: AddPostProps) {
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
  const [imagesFiles, setImagesFilers] = useState<File[]>([])
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [isOpenCloseModal, setIsOpenCloseModal] = useState<boolean>(false)
  const { t } = useTranslation()
  const { addPostDescription, addPostTitle } = t.createPost.createPostMain
  const overlayRef = useRef<HTMLDivElement>(null)
  const next = () => {
    setStepIndex(i => i + 1)
  }

  const back = () => {
    setStepIndex(i => i - 1)
  }

  const handleOpenCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).className === overlayRef.current?.className) {
      if (imagesPreviews.length) {
        setIsOpenCloseModal(true)
      } else {
        onOpenChange(false)
      }
    }
  }

  const steps: ReactElement[] = useMemo(
    () => [
      <UploadPhoto
        key={'upload'}
        next={next}
        setImagesFilers={setImagesFilers}
        setImagesPreviews={setImagesPreviews}
        setIsOpenCloseModal={setIsOpenCloseModal}
      />,
      <CroppingPhoto
        back={back}
        imagesPreviews={imagesPreviews}
        key={'cropping'}
        next={next}
        setImagesFilers={setImagesFilers}
        setImagesPreviews={setImagesPreviews}
      />,
      <AddDescription
        back={back}
        imagesFiles={imagesFiles}
        imagesPreviews={imagesPreviews}
        key={'desctiption'}
        onOpenChange={onOpenChange}
        setStepIndex={setStepIndex}
      />,
    ],
    [imagesPreviews, imagesFiles, onOpenChange]
  )

  return (
    <DialogRoot open={isOpen}>
      <DialogOverlay onClick={e => handleOpenCloseModal(e)} ref={overlayRef}>
        <DialogContent className={styles.content}>
          <VisuallyHidden asChild>
            <DialogTitle>{addPostTitle}</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <DialogDescription>{addPostDescription}</DialogDescription>
          </VisuallyHidden>
          {steps[stepIndex]}
          <CloseModal
            closeMainModal={onOpenChange}
            isOpen={isOpenCloseModal}
            onOpenChange={setIsOpenCloseModal}
            setImagesFilers={setImagesFilers}
            setImagesPreviews={setImagesPreviews}
            setStepIndex={setStepIndex}
          />
        </DialogContent>
      </DialogOverlay>
    </DialogRoot>
  )
}

export default AddPost
