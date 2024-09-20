import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useId,
  useState,
} from 'react'

import { Button } from '@/components/button'
import {
  CloseOutlineIcon,
  EyeOffOutlineIcon,
  EyeOutlineIcon,
  SearchOutlineIcon,
} from '@/components/icons'
import { Typography } from '@/components/typography'
import clsx from 'clsx'

import s from './TextField.module.scss'

type TextFieldProps = {
  error?: string
  isRequired?: boolean
  label?: string
  variant?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

type TextFieldRef = ElementRef<'input'>

export const TextField = forwardRef<TextFieldRef, TextFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    error,
    isRequired = false,
    label,
    onChange,
    placeholder,
    value,
    variant = 'text',
    ...rest
  } = props
  const [showPassword, setShowPassword] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const id = useId()

  const isPassword = variant === 'password'
  const inputType = !showPassword && isPassword ? 'password' : 'text'
  const isSearch = variant === 'search'

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    setInputValue(e.currentTarget.value)
  }

  const clearInputHandler = () => {
    setInputValue('')
  }

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className={s.container}>
      {label && (
        <Typography
          as={'label'}
          className={clsx(disabled && s.disabled)}
          grey
          htmlFor={id}
          isRequired={isRequired}
        >
          {label}
        </Typography>
      )}
      <div className={s.inputContainer}>
        {isSearch && <SearchOutlineIcon className={clsx(s.iconSearch, disabled && s.disabled)} />}
        <input
          className={clsx(s.input, s[variant], error && s.error, disabled && s.disabled, className)}
          disabled={disabled}
          id={id}
          onChange={inputChangeHandler}
          placeholder={placeholder}
          ref={ref}
          type={inputType}
          value={inputValue}
          {...rest}
        />
        {isPassword && !!inputValue && (
          <Button
            className={clsx(
              s.passwordControl,
              error && s.error,
              disabled && s.disabled,
              s.showIcon
            )}
            disabled={disabled}
            onClick={showPasswordHandler}
            variant={'icon'}
          >
            {showPassword ? (
              <EyeOutlineIcon className={s.icon} />
            ) : (
              <EyeOffOutlineIcon className={s.icon} />
            )}
          </Button>
        )}
        {isSearch && !!inputValue && (
          <Button
            className={clsx(s.clearIcon, disabled && s.disabled)}
            disabled={disabled}
            onClick={clearInputHandler}
            variant={'icon'}
          >
            <CloseOutlineIcon className={s.icon} />
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
