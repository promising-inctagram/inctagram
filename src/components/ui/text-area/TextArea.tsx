import { ComponentProps, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './TextArea.module.scss'

import { Typography } from '../typography'

type TextAreaProps = {
  errorMessage?: string
  label?: string
} & ComponentProps<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, errorMessage, label, ...rest }, ref) => {
    const showError = !!errorMessage

    return (
      <div className={s.container}>
        {label && (
          <Typography className={s.label} variant={'regular_text_14'}>
            {label}
          </Typography>
        )}
        <textarea
          className={clsx(s.textarea, showError && s.error, className)}
          ref={ref}
          {...rest}
        />

        {showError && (
          <Typography className={s.error} variant={'regular_text_14'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)