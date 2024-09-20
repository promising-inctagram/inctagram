import React, { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import { Button } from '@/components/button'
import { EyeOffOutlineIcon, EyeOutlineIcon, SearchOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import clsx from 'clsx'

import s from './TextField.module.scss'

type Props = {
  error?: string
  label?: string
  variant?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, disabled, error, label, placeholder, type, variant, ...rest } = props

  const id = useId()
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  const [value, setValue] = useState('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  return (
    <div className={s.box}>
      {label && (
        <Typography as={'label'} className={clsx(s.label, disabled && s.disabled)} htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={s.inputContainer}>
        {variant === 'search' && (
          <span className={clsx(s.iconSearch, disabled && s.disabled)}>
            <SearchOutlineIcon />
          </span>
        )}
        <input
          className={clsx(s.input, error && s.error, className)}
          disabled={disabled}
          id={id}
          // onChange={onChangeHandler}
          placeholder={placeholder}
          ref={ref}
          type={variant === 'password' && isVisiblePassword ? 'text' : variant}
          // value={value}
          {...rest}
        />
        {variant === 'password' && (
          <Button
            className={clsx(s.passwordControl, !!value && s.showIcon)}
            onClick={() => {
              setIsVisiblePassword(prevState => !prevState)
            }}
            type={'button'}
          >
            {isVisiblePassword ? <EyeOutlineIcon /> : <EyeOffOutlineIcon />}
          </Button>
        )}
      </div>
      {error && (
        <Typography as={'span'} variant={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
})
