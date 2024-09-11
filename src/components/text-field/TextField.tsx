import React, { ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import { EyeOutlineIcon, SearchOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import clsx from 'clsx'

import s from './TextField.module.scss'

type Props = {
  error?: string
  label?: string
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { disabled, error, label, placeholder, type, value, ...rest } = props

  const id = useId()

  const [isFocused, setIsFocused] = useState(false)
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      setIsFocusVisible(true)
    }
  }

  const handleKeyUp = () => {
    setIsFocusVisible(false)
  }

  const inputClassNames = clsx(
    s.input,
    error && s.error,
    disabled && s.disabled,
    isFocusVisible && s.inputFocusVisible
  )
  const iconSearchClassNames = clsx(
    s.iconSearch,
    isFocused && s.focusedIconSearch,
    error && s.focusedIconSearch,
    disabled && s.disabled
  )

  return (
    <div className={s.root}>
      {label && (
        <label className={clsx(s.label, disabled && s.disabled)} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={s.inputContainer}>
        {type === 'search' && (
          <span className={iconSearchClassNames}>
            <SearchOutlineIcon />
          </span>
        )}
        <input
          className={inputClassNames}
          disabled={disabled}
          id={id}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          placeholder={placeholder}
          ref={ref}
          type={type}
          value={value}
          {...rest}
        />
        {type === 'password' && (
          // eslint-disable-next-line react/button-has-type
          <button className={clsx(s.iconEye, disabled && s.disabled)}>
            <EyeOutlineIcon />
          </button>
        )}
      </div>
      {error && (
        /*<Typography as={'span'} className={s.errorMessage} variant>
                  {error}
                </Typography>*/
        <span className={s.errorMessage}>{error}</span>
      )}
    </div>
  )
})
