import type { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './Card.module.scss'

type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>
type InferType<T> = T extends ElementType<infer U> ? U : never
export const Card = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: ForwardedRef<InferType<T>>) => {
    const { as: Component = 'div', className, ...rest } = props
    const cn = clsx(s.card, className)

    return <Component className={cn} ref={ref} {...rest} />
  }
)
