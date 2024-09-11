import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Typography.module.scss'

export type TypographyType<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
  variant?:
    | 'bold_text_14'
    | 'bold_text_16'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'medium_text_14'
    | 'regular_link'
    | 'regular_text_14'
    | 'regular_text_16'
    | 'semi-bold_small_text'
    | 'small_link'
    | 'small_text'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType>(
  props: Omit<ComponentPropsWithoutRef<T>, keyof TypographyType<T>> & TypographyType<T>
) => {
  const { as: Component = 'p', className, text, variant = 'regular_text_14', ...rest } = props
  const typographyClasses = clsx(s[variant], className)

  return <Component className={typographyClasses} {...rest} />
}
