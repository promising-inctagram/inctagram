import { ComponentPropsWithoutRef } from 'react'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './Avatar.module.scss'

type AvatarProps = {
  avatarOwner?: string
  size?: number
  src?: string
} & ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>

export const Avatar = (props: AvatarProps) => {
  const { avatarOwner, className, size, ...rest } = props
  const classNames = {
    fallback: clsx(s.fallback),
    image: clsx(s.avatar_img),
    root: clsx(s.root, className),
  }

  return (
    <AvatarPrimitive.Root className={classNames.root} {...rest}>
      <AvatarPrimitive.Image alt={'avatar'} className={classNames.image} src={src} />
      <AvatarPrimitive.Fallback className={classNames.fallback}>
        <Typography variant={'subtitle2'}>{fallbackTitle}</Typography>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

export default Avatar
