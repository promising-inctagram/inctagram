import type { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './Card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>
export const Card = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps, ref: ForwardedRef<T>) => {
    const { as: Component = 'div', className, ...rest } = props
    const cn = clsx(s.card, className)

    return <Component className={cn} ref={ref} {...rest} />
  }
)
