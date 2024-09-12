import React, { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import clsx from 'clsx'

import styles from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'icon' | 'language' | 'link' | 'outlined' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<'button'>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props
    const cn = clsx(styles.button, styles[variant], fullWidth && styles.fullWidth, className)

    return <Component className={cn} ref={ref} {...rest} />
  }
)

// Button.displayName = 'Button'
