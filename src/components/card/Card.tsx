import type { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './Card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  className: string
  maxWidth?: string
  variant?: 'dark' | 'light'
} & ComponentPropsWithoutRef<T>
export const Card = <T extends ElementType = 'div'>(props: CardProps) => {
  const { as: Component = 'div', className, maxWidth, variant = 'dark', ...rest } = props

  return <Component className={clsx(s.card, s[variant], className)} {...rest} />
}
