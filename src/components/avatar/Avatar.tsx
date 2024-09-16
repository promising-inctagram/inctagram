import { ComponentPropsWithoutRef } from 'react'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './Avatar.module.scss'

type AvatarProps = {
  size?: number
  src?: string
  userName?: string
} & ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>

export const Avatar = ({ className, size = 204, src, userName, ...rest }: AvatarProps) => {
  const classNames = {
    fallback: s.fallback,
    image: s.avatar_img,
    root: clsx(s.root, className),
  }
  const fallbackTitle = userName?.[0].toUpperCase()

  return (
    <AvatarPrimitive.Root className={classNames.root} {...rest}>
      <AvatarPrimitive.Image
        alt={'avatar'}
        className={classNames.image}
        height={size}
        src={src}
        width={size}
      />
      <AvatarPrimitive.Fallback
        className={classNames.fallback}
        style={{ height: `${size}px`, width: `${size}px` }}
      >
        {fallbackTitle}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
