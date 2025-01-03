import { Dispatch, SetStateAction, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { Button } from '@/components/ui'

import s from './ImageEditor.module.scss'

interface ImageEditorProps {
  imagesPreviews: string[]
  setImagesPreviews: Dispatch<SetStateAction<string[]>>
  setShowZoom: (state: boolean) => void
  slideValue: number
}

const ImageEditor = ({
  imagesPreviews,
  setImagesPreviews,
  setShowZoom,
  slideValue,
}: ImageEditorProps) => {
  const editorRef = useRef<AvatarEditor>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })

  const handleSaveImage = () => {
    if (editorRef.current) {
      // Получаем измененное изображение
      const canvas = editorRef.current.getImageScaledToCanvas()

      // Преобразуем canvas в base64
      const editedImageBase64 = canvas.toDataURL('image/jpeg')

      const updatedImages = [...imagesPreviews]

      updatedImages[currentIndex] = editedImageBase64

      setImagesPreviews(updatedImages)
    }
    setShowZoom(false)
  }
  const handleNext = () => {
    if (currentIndex < imagesPreviews.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }
  const handlePositionChange = (position: { x: number; y: number }) => {
    setPosition(position)
  }

  return (
    <div className={s.container}>
      <AvatarEditor
        backgroundColor={'black'}
        color={[23, 23, 23, 0.6]}
        disableBoundaryChecks={false}
        height={316}
        image={imagesPreviews[currentIndex]}
        onPositionChange={handlePositionChange}
        position={position}
        ref={editorRef}
        scale={slideValue / 10}
        width={316}
      />
      <div className={s.btnContainer}>
        <Button disabled={currentIndex === 0} onClick={handlePrevious}>
          Предыдущее
        </Button>
        <Button disabled={currentIndex === imagesPreviews.length - 1} onClick={handleNext}>
          Следующее
        </Button>
        <Button onClick={handleSaveImage}>Сохранить</Button>
      </div>
    </div>
  )
}

export default ImageEditor
