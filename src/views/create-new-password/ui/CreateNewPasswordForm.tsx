import React from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import styles from './CreateNewPasswordForm.module.scss'

import { createNewPasswordSchemeCreator } from '../model/create-new-password-scheme-creator'

export type formTypes = {
  confirmPassword: string
  password: string
}

export const CreateNewPasswordForm = () => {
  const { t } = useTranslation()
  const {
    formButton,
    labelConfirmPassword,
    labelPassword,
    passwordHelp,
    placeholderConfirmPassword,
    placeholderPassword,
  } = t.passwordRecoveryPage.createNewPassword

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    trigger,
  } = useForm<formTypes>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(createNewPasswordSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(data => {
    trigger()
    if (isValid) {
      console.log(data)
      reset()
    }
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
          name={'confirmPassword'}
          placeholder={placeholderConfirmPassword}
          variant={'password'}
        />
      </div>
      <Typography className={styles.text} variant={'regular_text_14'}>
        {passwordHelp}
      </Typography>
      <Button as={Link} href={Paths.logIn} type={'submit'}>
        {formButton}
      </Button>
    </form>
  )
}
