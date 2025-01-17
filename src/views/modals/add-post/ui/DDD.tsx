/*
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { EffectFade, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

type CarouselProps = {
  slides: string[]
} & ComponentPropsWithoutRef<typeof Swiper>

type SwiperRef = ElementRef<typeof Swiper>

export const CarouselD = forwardRef<SwiperRef, CarouselProps>(({ slides, ...rest }, ref) => {
  const [scale, setScale] = useState(1) // Масштаб для текущего изображения
  const avatarEditorRef = useRef<AvatarEditor | null>(null)

  const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(event.target.value))
  }

  const handleSave = () => {
    if (avatarEditorRef.current) {
      // Получаем canvas с изображением
      const canvas = avatarEditorRef.current.getImageScaledToCanvas()
      // Преобразуем его в base64
      const croppedImage = canvas.toDataURL('image/png')

      console.log('Cropped Image (Base64):', croppedImage)

      // Можно передать этот Base64-строку на сервер или использовать дальше
      // Например, открыть в новой вкладке
      const newWindow = window.open()

      if (newWindow) {
        newWindow.document.body.innerHTML = `<img src="${croppedImage}" alt="Cropped Image" />`
      }
    }
    if (editorRef.current) {
      // Получаем измененное изображение
      const canvas = editorRef.current.getImageScaledToCanvas()

      // Преобразуем canvas в base64
      const editedImageBase64 = canvas.toDataURL('image/jpeg')

      const updatedImages = [...imagesPreviews]

      updatedImages[currentIndex] = editedImageBase64

      setImagesPreviews(updatedImages)
    }
  }

  return (
    <div style={{ margin: '0 auto', width: '400px' }}>
      <Swiper
        centeredSlides
        modules={[EffectFade, Keyboard, Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        ref={ref}
        {...rest}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <AvatarEditor
              border={20}
              borderRadius={10}
              height={300}
              image={slide}
              ref={avatarEditorRef}
              scale={scale}
              width={300}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <input
          max={'3'}
          min={'1'}
          onChange={handleScaleChange}
          step={'0.1'}
          style={{ width: '300px' }}
          type={'range'}
          value={scale}
        />
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handleSave} style={{ fontSize: '16px', padding: '10px 20px' }}>
          Save Cropped Image
        </button>
      </div>
    </div>
  )
})
*/
