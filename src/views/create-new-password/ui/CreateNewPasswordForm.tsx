import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useCreateNewPasswordMutation } from '@/shared/api/auth/auth.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import styles from './CreateNewPasswordForm.module.scss'

import { createNewPasswordSchemeCreator } from '../model/create-new-password-scheme-creator'
import { CreatePWDFields } from '../model/types'

type CreateNewPasswordFormProps = {
  recoveryCode: string
  setIsLinkExpired: (value: boolean) => void
}

export const CreateNewPasswordForm = ({
  recoveryCode,
  setIsLinkExpired,
}: CreateNewPasswordFormProps) => {
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
      setIsLinkExpired(true)
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
      <Button type={'submit'}>{formButton}</Button>
    </form>
  )
}
