import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'

import styles from './ForgotPasswordForm.module.scss'

export type formTypes = {
  email: string
}

interface ForgotPasswordFormProps {
  isMessageSent: boolean
  onSubmit: (data: formTypes) => void
  setIsMessageSent: (value: boolean) => void
}

export const ForgotPasswordForm = ({
  isMessageSent,
  onSubmit,
  setIsMessageSent,
}: ForgotPasswordFormProps) => {
  const { t } = useTranslation()
  const { formButton, formContent, sentLinkText } = t.passwordRecoveryPage.forgotPasswordPage
  const { control, handleSubmit } = useForm<formTypes>()

  const formHandler = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={styles.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={'Email'}
        name={'email'}
        placeholder={'Epam@epam.com'}
      />
      <Typography className={styles.text} variant={'regular_text_14'}>
        {formContent}
      </Typography>
      {isMessageSent && (
        <Typography className={styles.sentMessage} variant={'regular_text_14'}>
          {sentLinkText}
        </Typography>
      )}
      <Button disabled={false} type={'submit'}>
        {formButton}
      </Button>
    </form>
  )
}
