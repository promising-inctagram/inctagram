import React, { ReactElement, useMemo, useState } from 'react'

import { getSidebarLayout } from '@/components'
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

function AddPost({ isOpen = true, onOpenChange }: AddPostProps) {
  const [images, setImages] = useState<string[]>([])
  const [imagesFiles, setImagesFilers] = useState<File[]>([])
  const [stepIndex, setStepIndex] = useState<number>(0)
  const [isOpenCloseModal, setIsOpenCloseModal] = useState<boolean>(false)
  const { t } = useTranslation()
  const { addPostDescription, addPostTitle } = t.createPost.createPostMain

  const next = () => {
    setStepIndex(i => i + 1)
  }

  const back = () => {
    setStepIndex(i => i - 1)
  }

  const handleOpenCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).className === 'Dialog_overlay__ptaiT') {
      setIsOpenCloseModal(true)
    }
  }

  const steps: ReactElement[] = useMemo(
    () => [
      <UploadPhoto
        key={'upload'}
        next={next}
        setImages={setImages}
        setImagesFilers={setImagesFilers}
        setIsOpenCloseModal={setIsOpenCloseModal}
      />,
      <CroppingPhoto
        back={back}
        images={images}
        key={'cropping'}
        next={next}
        setImages={setImages}
        setImagesFilers={setImagesFilers}
      />,
      <AddDescription back={back} images={images} imagesFiles={imagesFiles} key={'desctiption'} />,
    ],
    [images, imagesFiles]
  )

  return (
    <DialogRoot open={isOpen}>
      <DialogOverlay onClick={e => handleOpenCloseModal(e)}>
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
            setImages={setImages}
            setImagesFilers={setImagesFilers}
            setStepIndex={setStepIndex}
          />
        </DialogContent>
      </DialogOverlay>
    </DialogRoot>
  )
}

AddPost.getLayout = getSidebarLayout
export default AddPost

// todo: ждать пока Ксюша доделает ошибки
// todo: аватар
