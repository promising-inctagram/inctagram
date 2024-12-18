import { ImageOutlineIcon } from '@/components/ui/icons'
import { clsx } from 'clsx'

import s from './BlankImage.module.scss'
type Props = {
  className?: string
  height: number
  type?: 'circle' | 'square'
  width: number
}
export const BlankImage = ({ className, height, type = 'circle', width }: Props) => {
  const cn = clsx(s.root, s[type], className)

  return (
    <div className={cn}>
      <ImageOutlineIcon height={height} width={width} />
    </div>
  )
}
