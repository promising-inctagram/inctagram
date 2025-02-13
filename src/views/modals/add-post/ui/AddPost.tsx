import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react'

import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
} from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import { FilterPost } from '@/views/modals/add-post/ui/FilterPost'
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

  // это нужно чтобы сохранить изначальные картины чтобы потом можно было сбрасывать фильтры с них!
  const [imagesPreviewsResetFilter, setImagesPreviewsResetFilter] = useState<string[]>([])
  const [imagesFilesResetFilter, setImagesFilersResetFilter] = useState<File[]>([])

  const next = () => {
    setStepIndex(i => i + 1)
  }

  const [isBack, setIsBack] = useState(false)

  // это нужно чтобы фильтры с картинок сбрасывались если юзер будет идти назад!
  useEffect(() => {
    if (isBack) {
      setImagesFilers(imagesFilesResetFilter)
      setImagesPreviews(imagesPreviewsResetFilter)
      setIsBack(false)
    }
  }, [isBack])

  const back = () => {
    setStepIndex(i => i - 1)
    setIsBack(true)
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
        setImagesFilersResetFilter={setImagesFilersResetFilter}
        setImagesPreviews={setImagesPreviews}
        setImagesPreviewsResetFilter={setImagesPreviewsResetFilter}
        setIsOpenCloseModal={setIsOpenCloseModal}
      />,
      <CroppingPhoto
        back={back}
        imagesPreviews={imagesPreviews}
        key={'cropping'}
        next={next}
        setImagesFilers={setImagesFilers}
        setImagesFilersResetFilter={setImagesFilersResetFilter}
        setImagesPreviews={setImagesPreviews}
        setImagesPreviewsResetFilter={setImagesPreviewsResetFilter}
      />,
      <FilterPost
        back={back}
        imagesFiles={imagesFiles}
        imagesPreviews={imagesPreviews}
        isBack={isBack}
        key={'filters'}
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
