import React, { ChangeEvent, ComponentProps, ReactNode, forwardRef, useState } from 'react'

import clsx from 'clsx'

import s from './TextField.module.scss'

type Props = {
  error?: string
  iconEnd?: ReactNode
  iconStart?: ReactNode
  labelTitle?: ReactNode
} & ComponentProps<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { disabled, error, iconEnd, iconStart, labelTitle, placeholder, type, value, ...rest } =
    props

  const [name, setName] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

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

  const getFinalType = (type: ComponentProps<'input'>['type']) => {
    switch (type) {
      case 'search':
        return 'search'
      default:
        return 'text'
    }
  }

  const finalType = getFinalType(type)

  const inputClassNames = clsx(
    s.input,
    error && s.error,
    disabled && s.disabled,
    isFocusVisible && s.inputFocusVisible
  )
  const iconStartClassNames = clsx(
    s.iconStart,
    isFocused && s.focusedIconStart,
    error && s.focusedIconStart,
    disabled && s.disabled
  )

  const dataIconStart = iconStart ? 'start' : ''
  const dataIconEnd = iconEnd ? 'end' : ''
  const dataIcon = dataIconStart + dataIconEnd

  return (
    <div className={s.root}>
      {labelTitle && (
        <label className={clsx(s.label, disabled && s.disabled)} htmlFor={name}>
          {labelTitle}
        </label>
      )}
      <div className={s.inputContainer}>
        {iconStart && <span className={iconStartClassNames}>{iconStart}</span>}
        <input
          className={inputClassNames}
          data-icon={dataIcon}
          disabled={disabled}
          id={name}
          onBlur={handleBlur}
          onChange={handleOnChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          placeholder={placeholder}
          ref={ref}
          required
          type={finalType}
          value={value}
          {...rest}
        />
        {/*{iconEnd && <button className={clsx(s.iconEnd, disabled && s.disabled)}>{iconEnd}</button>}*/}
      </div>
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  )
})
