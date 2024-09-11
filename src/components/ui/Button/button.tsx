import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import styles from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'icon' | 'link' | 'outlined' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<'button'>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <Component
      className={`${styles.button} ${styles[variant]} ${
        fullWidth ? styles.fullWidth : ''
      } ${className}`}
      {...rest}
    />
  )
}
