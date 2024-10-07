import React from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'

import styles from './CreateNewPasswordForm.module.scss'

export type formTypes = {
  password: string
  passwordConfirmation: string
}

interface CreateNewPasswordFormProps {
  onSubmit: (data: formTypes) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: CreateNewPasswordFormProps) => {
  const { t } = useTranslation()
  const {
    formButton,
    labelConfirmPassword,
    labelPassword,
    passwordHelp,
    placeholderConfirmPassword,
    placeholderPassword,
  } = t.passwordRecoveryPage.createNewPassword

  const { control, handleSubmit } = useForm<formTypes>()

  const formHandler = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={styles.container} onSubmit={formHandler}>
      <div className={styles.fieldsContainer}>
        <ControlledTextField
          control={control}
          label={labelPassword}
          name={'password'}
          placeholder={placeholderPassword}
          variant={'password'}
        />
        <ControlledTextField
          control={control}
          label={labelConfirmPassword}
          name={'passwordConfirmation'}
          placeholder={placeholderConfirmPassword}
          variant={'password'}
        />
      </div>
      <Typography className={styles.text} variant={'regular_text_14'}>
        {passwordHelp}
      </Typography>
      <Button>{formButton}</Button>
    </form>
  )
}
