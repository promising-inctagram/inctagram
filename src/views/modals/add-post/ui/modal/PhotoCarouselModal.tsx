import React, { useRef } from 'react'

import { Button, Card, ScrollArea } from '@/components/ui'
import { CloseOutlineIcon, PlusCircleOutlineIcon } from '@/components/ui/icons'

import styles from './PhotoCarouselModal.module.scss'

export type ProtoCatouselModalProps = {
  deleteImage: (index: number) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  images: string[]
}

const PhotoCarouselModal = ({ deleteImage, handleFileChange, images }: ProtoCatouselModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className={styles.card}>
      <ScrollArea className={styles.scroll}>
        <div className={styles.imagesContainer}>
          {images.map((elem, index) => (
            <div className={styles.smallImageContainer} key={`${elem}${index}`}>
              <img alt={'sad'} className={styles.smallImage} src={elem} />
              <Button onClick={() => deleteImage(index)} variant={'icon'}>
                <CloseOutlineIcon className={styles.closeIcon} height={'12'} width={'12'} />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button disabled={images.length === 10} onClick={onSubmit} variant={'icon'}>
        <PlusCircleOutlineIcon height={'36'} width={'36'} />
        <input
          accept={'.jpg,.png'}
          hidden
          onChange={e => handleFileChange(e)}
          ref={fileInputRef}
          type={'file'}
        />
      </Button>
    </Card>
  )
}

export default PhotoCarouselModal
