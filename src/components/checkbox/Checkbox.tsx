import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { CheckmarkOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import styles from './Checkbox.module.scss'

type Props = {
  checked?: boolean
  id: number | string
  onChangeChecked?: (checked: boolean) => void
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

type CheckboxForwardRef = ElementRef<typeof RadixCheckbox.Root>

export const Checkbox = forwardRef<CheckboxForwardRef, Props>(
  ({ checked, children, disabled, id, onChangeChecked, ...props }: Props, ref) => {
    const handleChange = (stateChecked: boolean): void => {
      onChangeChecked?.(stateChecked)
    }

    return (
      <div className={styles.Wrapper}>
        <RadixCheckbox.Root
          checked={checked}
          className={clsx(
            styles.Root,
            checked && styles.checked,
            disabled && !checked && styles.disableUnchecked
          )}
          defaultChecked={checked}
          disabled={disabled}
          id={id}
          onCheckedChange={handleChange}
          ref={ref}
          {...props}
        >
          <RadixCheckbox.Indicator className={styles.Indicator}>
            {<CheckmarkOutlineIcon className={styles.Icon} />}
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <Typography as={'label'} className={styles.Label} htmlFor={id}>
          {children}
        </Typography>
      </div>
    )
  }
)
