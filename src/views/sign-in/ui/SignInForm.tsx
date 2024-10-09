import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useAppSelector } from '@/lib/store'
import { LoginArgs } from '@/shared/api/auth/auth.types'
import { errorSelector } from '@/shared/api/auth/model/auth-slice'
import { Paths } from '@/shared/enums'
import { useLoginValidation } from '@/views/sign-in/model/useLoginValidation'
import Link from 'next/link'

import s from './SignIn.module.scss'

type Props = {
  onSubmit: (data: LoginArgs) => void
}

export const SignInForm = ({ onSubmit }: Props) => {
  const { control, errors, handleSubmit, isValid, t } = useLoginValidation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm
  const error = useAppSelector(errorSelector)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        control={control}
        errorMessage={errors.email?.message}
        label={labels.email}
        name={'email'}
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
        errorMessage={errors.password?.message || error}
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
