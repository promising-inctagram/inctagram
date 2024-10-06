import { useState } from 'react'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useLoginValidation } from '@/views/sign-in/model/useLoginValidation'
import Link from 'next/link'

import s from './SignIn.module.scss'

export type LoginArgs = {
  email: string
  password: string
}

type Props = {
  onSubmit: (data: LoginArgs) => void
}

export const SignInForm = ({ onSubmit }: Props) => {
  const { control, errors, handleSubmit, isValid, t } = useLoginValidation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm
  const [showLoginError, setShowLoginError] = useState(false)

  const loginError = 'The email or password are\n' + 'incorrect. Try again please'

  const handleFormSubmit = (data: any) => {
    setShowLoginError(true)
    onSubmit(data)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <ControlledTextField
        control={control}
        errorMessage={errors.email?.message}
        label={labels.email}
        name={'email'}
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
        errorMessage={showLoginError && !isValid ? loginError : errors.password?.message}
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
