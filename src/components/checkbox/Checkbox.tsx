import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckmarkOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './Checkbox.module.scss'

type CheckboxProps = {
  error?: string
  isRequired?: boolean
  label?: string
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

type CheckboxRef = ElementRef<typeof RadixCheckbox.Root>

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const { className, disabled, error, isRequired, label, ...rest } = props
  const checkboxId = useId()

  return (
    <div>
      <RadixCheckbox.Root
        className={clsx(s.root, error && s.error, className)}
        disabled={disabled}
        id={checkboxId}
        ref={ref}
        {...rest}
      >
        <RadixCheckbox.Indicator className={clsx(s.indicator, disabled && s.disabled)}>
          <CheckmarkOutlineIcon className={clsx(s.icon, disabled && s.disabledIcon)} />
        </RadixCheckbox.Indicator>
        {label && (
          <Typography
            as={'label'}
            className={clsx(s.label, disabled && s.disabled)}
            htmlFor={checkboxId}
            isRequired={isRequired}
            variant={'regular_text_14'}
          >
            {label}
          </Typography>
        )}
      </RadixCheckbox.Root>
      {error && (
        <Typography as={'span'} variant={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
})
