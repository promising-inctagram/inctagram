import { SubmitHandler, useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { LoginArgs } from '@/views/sign-in/ui/SignInPage'
import Link from 'next/link'

import s from './SignIn.module.scss'

type Props = {
  onSubmit: SubmitHandler<LoginArgs>
}

export const SignInForm = ({ onSubmit }: Props) => {
  const { t } = useTranslation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm
  const { control, handleSubmit } = useForm<LoginArgs>()

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        className={s.emailInput}
        control={control}
        isRequired
        label={labels.email}
        name={'email'}
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
        isRequired
        label={labels.password}
        name={'password'}
        placeholder={placeholders.addPassword}
        variant={'password'}
      />
      <Typography as={Link} className={s.passwordLink} grey href={Paths.forgotPassword}>
        {forgotPassword}
      </Typography>
      <Button fullWidth type={'submit'}>
        {submitButton}
      </Button>
    </form>
  )
}
