import type { ComponentPropsWithoutRef, ElementType } from 'react'

import s from './Card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>
export const Card = <T extends ElementType = 'div'>(props: CardProps) => {
  const { as: Component = 'div', className, ...rest } = props

  return <Component className={clsx(s.card, className)} {...rest} />
}
