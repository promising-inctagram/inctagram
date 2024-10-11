import { useState } from 'react'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useLoginMutation } from '@/shared/api/auth/auth.api'
import { ErrorResponseLogin } from '@/shared/api/auth/auth.types'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { useLoginValidation } from '@/views/sign-in/model/hooks/useLoginValidation'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

export const SignInForm = () => {
  const { t } = useTranslation()
  const { control, errors, handleSubmit, isValid } = useLoginValidation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm

  const [login] = useLoginMutation()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const formHandler = handleSubmit(async data => {
    try {
      const resData = await login(data).unwrap()

      if (resData) {
        const accessToken = resData.accessToken

        localStorage.setItem('accessToken', accessToken)

        await router.push(Paths.home)
      }
    } catch (err: unknown) {
      const error = err as ErrorResponseLogin
      const { data, status } = error
      const errorMessage = status === 401 ? data.errorsMessage : ''

      setErrorMessage(errorMessage)
    }
  })

  return (
    <form className={s.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        errorMessage={errors.email?.message}
        label={labels.email}
        name={'email'}
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
        errorMessage={errors.password?.message || errorMessage}
        label={labels.password}
        name={'password'}
        placeholder={placeholders.addPassword}
        variant={'password'}
      />
      <Typography as={Link} className={s.passwordLink} grey href={Paths.forgotPassword}>
        {forgotPassword}
      </Typography>
      <Button disabled={!isValid} fullWidth type={'submit'}>
        {submitButton}
      </Button>
    </form>
  )
}
