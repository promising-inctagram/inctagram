import React, { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import { EyeOffOutlineIcon, EyeOutlineIcon, SearchOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/Button'
import clsx from 'clsx'

import s from './TextField.module.scss'

type Props = {
  error?: string
  label?: string
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  console.log('render')
  const {
    className,
    disabled,
    error,
    label,
    onChange,
    onChangeValue,
    placeholder,
    type,
    value,
    ...rest
  } = props

  const id = useId()
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)
  const [isShowIcon, setIsShowIcon] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    setIsShowIcon(e.currentTarget.value.length > 0)
  }

  return (
    <div className={clsx(s.box, className)}>
      {label && (
        <label className={clsx(s.label, disabled && s.disabled)} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={s.inputContainer}>
        {type === 'search' && (
          <span className={clsx(s.iconSearch, disabled && s.disabled)}>
            <SearchOutlineIcon />
          </span>
        )}
        <input
          className={clsx(s.input, error && s.error)}
          disabled={disabled}
          id={id}
          onChange={onChangeHandler}
          placeholder={placeholder}
          ref={ref}
          type={type === 'password' && isVisiblePassword ? 'text' : type}
          value={value}
          {...rest}
        />
        {type === 'password' && (
          <button
            className={clsx(s.passwordControl, isShowIcon && s.showIcon, className)}
            onClick={() => {
              setIsVisiblePassword(prevState => !prevState)
            }}
            type={'button'}
          >
            {isVisiblePassword ? <EyeOutlineIcon /> : <EyeOffOutlineIcon />}
          </button>
        )}
      </div>
      {
        error && <span className={s.errorMessage}>{error}</span>
        /*<Typography as={'span'} className={s.errorMessage} variant>
                          {error}
                        </Typography>*/
      }
    </div>
  )
})
