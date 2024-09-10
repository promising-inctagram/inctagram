import React, { ComponentPropsWithoutRef } from 'react'
import styles from './button.module.scss'

export type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'outlined' | 'text';
    fullWidth?: boolean;
    
} & ComponentPropsWithoutRef<'button'>

export const Button = ({className, fullWidth, variant = 'primary', ...rest}: ButtonProps) => {
  return (
    <button 
        className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
        {...rest}
    />
  )
}
