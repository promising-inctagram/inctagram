import React, { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckmarkOutlineIcon } from '@/components/icons'
import { Typography } from '@/components/typography'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import styles from './Checkbox.module.scss'

type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

type CheckboxForwardRef = ElementRef<typeof RadixCheckbox.Root>

export const Checkbox = forwardRef<CheckboxForwardRef, CheckboxProps>((props, ref) => {
  const { className, label } = props
  const checkboxId = useId()

  return (
    <div className={styles.Wrapper}>
      <RadixCheckbox.Root
        {...props}
        className={clsx(styles.Root, className)}
        id={checkboxId}
        ref={ref}
      >
        <RadixCheckbox.Indicator className={styles.Indicator}>
          <CheckmarkOutlineIcon className={styles.Icon} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Typography as={'label'} className={styles.Label} htmlFor={checkboxId}>
          {label}
        </Typography>
      )}
    </div>
  )
})
