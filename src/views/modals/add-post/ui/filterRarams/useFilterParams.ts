import React, { useEffect, useRef, useState } from 'react'

import { useTranslation } from '@/shared/hooks'

type useFilterParamsProps = {
  imagesFiles: File[]
  imagesPreviews: string[]
  isBack: boolean
  setImagesFilers: React.Dispatch<React.SetStateAction<File[]>>
  setImagesPreviews: React.Dispatch<React.SetStateAction<string[]>>
}

export const useFilterParams = ({
  imagesFiles,
  imagesPreviews,
  isBack,
  setImagesFilers,
  setImagesPreviews,
}: useFilterParamsProps) => {
  const [imageIndex, setImageIndex] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const originalImagesDataRef = useRef<(ImageData | null)[]>([])
  const originalFilesRef = useRef<File[]>(imagesFiles.slice()) // Store original files
  const originalPreviewsRef = useRef<string[]>(imagesPreviews.slice())

  const { t } = useTranslation()

  const applyFilter = (filterType: string) => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return
    }

    const img = new Image()
    const file = imagesFiles[imageIndex]

    img.src = URL.createObjectURL(file)

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      if (!originalImagesDataRef.current[imageIndex]) {
        ctx.drawImage(img, 0, 0)
        originalImagesDataRef.current[imageIndex] = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        )
      } else {
        ctx.putImageData(originalImagesDataRef.current[imageIndex]!, 0, 0)
      }

      if (filterType === 'original') {
        // Handle 'original' case separately
        setImagesPreviews(originalPreviewsRef.current)
        setImagesFilers(originalFilesRef.current)

        return
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      switch (filterType) {
        case 'grayscale':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3

            data[i] = data[i + 1] = data[i + 2] = avg
          }
          break
        case 'sepia':
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            data[i] = Math.round(0.393 * r + 0.769 * g + 0.189 * b)
            data[i + 1] = Math.round(0.349 * r + 0.686 * g + 0.168 * b)
            data[i + 2] = Math.round(0.272 * r + 0.534 * g + 0.131 * b)
          }
          break
        case 'invert':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i]
            data[i + 1] = 255 - data[i + 1]
            data[i + 2] = 255 - data[i + 2]
          }
          break
        case 'brightness': // Example brightness adjustment
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.2) // Increase red
            data[i + 1] = Math.min(255, data[i + 1] * 1.2) // Increase green
            data[i + 2] = Math.min(255, data[i + 2] * 1.2) // Increase blue
          }
          break
        case 'contrast': {
          // Example contrast adjustment (simplified)
          const avg = data.reduce((a, c) => a + c) / data.length

          for (let i = 0; i < data.length; i += 4) {
            data[i] = (data[i] - avg) * 1.5 + avg
            data[i + 1] = (data[i + 1] - avg) * 1.5 + avg
            data[i + 2] = (data[i + 2] - avg) * 1.5 + avg
          }
          break
        }
        case 'pixelate': {
          const pixelSize = 10 // Adjust pixel size

          for (let y = 0; y < canvas.height; y += pixelSize) {
            for (let x = 0; x < canvas.width; x += pixelSize) {
              const i = (y * canvas.width + x) * 4
              const r = data[i]
              const g = data[i + 1]
              const b = data[i + 2]

              for (let py = 0; py < pixelSize; py++) {
                for (let px = 0; px < pixelSize; px++) {
                  const pi = ((y + py) * canvas.width + (x + px)) * 4

                  if (pi < data.length) {
                    data[pi] = r
                    data[pi + 1] = g
                    data[pi + 2] = b
                  }
                }
              }
            }
          }
          break
        }
        default:
          break
      }

      ctx.putImageData(imageData, 0, 0)
      const dataURL = canvas.toDataURL('image/jpeg')
      const newFile = dataURLtoFile(dataURL, file.name, file.type)

      setImagesPreviews(imagesPreviews.map((prev, i) => (i === imageIndex ? dataURL : prev)))
      setImagesFilers(imagesFiles.map((prev, i) => (i === imageIndex ? newFile : prev)))
    }
  }

  const dataURLtoFile = (dataurl: string, filename: string, type: string): File => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type })
  }

  const getSlideHandler = (index: number) => {
    setImageIndex(index)
    if (canvasRef.current && originalImagesDataRef.current[index]) {
      const ctx = canvasRef.current.getContext('2d')

      if (ctx) {
        ctx.putImageData(originalImagesDataRef.current[index]!, 0, 0)
      }
    }
  }

  useEffect(() => {
    if (isBack) {
      resetFilters()
    }
  }, [isBack])

  const resetFilters = () => {
    setImagesPreviews(originalPreviewsRef.current)
    setImagesFilers(originalFilesRef.current)
    originalImagesDataRef.current = [] // Clear cached image data
    if (canvasRef.current && canvasRef.current.getContext('2d')) {
      const ctx = canvasRef.current.getContext('2d')

      if (originalPreviewsRef.current[imageIndex]) {
        const img = new Image()

        img.src = originalPreviewsRef.current[imageIndex]
        img.onload = () => {
          if (canvasRef.current && ctx) {
            canvasRef.current.width = img.width
            canvasRef.current.height = img.height
            ctx.drawImage(img, 0, 0)
          }
        }
      }
    }
  }

  return {
    applyFilter,
    canvasRef,
    getSlideHandler,
    t,
  }
}
