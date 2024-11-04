import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useCreateNewPasswordMutation } from '@/shared/api/auth/auth.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { CreatePWDFields } from '@/views/create-new-password/model/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import styles from './CreateNewPasswordForm.module.scss'

import { createNewPasswordSchemeCreator } from '../model/create-new-password-scheme-creator'

type CreateNewPasswordFormProps = {
  recoveryCode: string
  setIsLinkExpired: (value: boolean) => void
}

export const CreateNewPasswordForm = ({
  recoveryCode,
  setIsLinkExpired,
}: CreateNewPasswordFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { t } = useTranslation()
  const {
    formButton,
    labelConfirmPassword,
    labelPassword,
    passwordHelp,
    placeholderConfirmPassword,
    placeholderPassword,
  } = t.passwordRecoveryPage.createNewPassword
  const [createNewPassword] = useCreateNewPasswordMutation()
  const router = useRouter()

  const { control, handleSubmit, setError } = useForm<CreatePWDFields>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createNewPasswordSchemeCreator(t.validation)),
  })

  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError('confirmPassword', { message: t.validation.passwordsMatch })
    } else {
      setError('confirmPassword', { message: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPassword, t.validation.passwordsMatch])

  const formHandler = handleSubmit(async data => {
    const fetchData = {
      newPassword: data.password,
      recoveryCode: recoveryCode,
    }

    try {
      await createNewPassword(fetchData).unwrap()

      router.push(Paths.logIn)
    } catch (e) {
      const errors = getErrorMessageData(e)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          if (el.field === 'newPassword') {
            setError('password', { message: el.message })
          } else if (el.field === 'recoveryCode') {
            setIsLinkExpired(true)
          } else {
            setErrorMessage(el.message)
          }
        })
      }
    }
  })

  return (
    <form className={styles.container} onSubmit={formHandler}>
      <div className={styles.fieldsContainer}>
        {errorMessage && (
          <Typography as={'span'} variant={'error'}>
            {errorMessage}
          </Typography>
        )}
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
      <Button type={'submit'}>{formButton}</Button>
    </form>
  )
}
