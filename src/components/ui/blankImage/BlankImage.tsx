import { ImageOutlineIcon } from '@/components/ui/icons'
import { clsx } from 'clsx'

import s from './BlankImage.module.scss'
type Props = {
  className?: string
  type?: 'circle' | 'square'
}
export const BlankImage = ({ className, type = 'circle' }: Props) => {
  const cn = clsx(s.root, s[type], className)

  return (
    <div className={cn}>
      <ImageOutlineIcon height={36} width={36} />
    </div>
  )
}
