import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'

import s from './SignIn.module.scss'

type Props = {
  onSubmit: SubmitHandler<LoginArgs>
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'The email or password are incorrect. Try again please'),
})

export type LoginArgs = z.infer<typeof loginSchema>

export const SignInForm = ({ onSubmit }: Props) => {
  const { t } = useTranslation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm
  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<LoginArgs>({
    resolver: zodResolver(loginSchema),
  })

  const [emailBlurred, setEmailBlurred] = useState(false)

  const handleEmailBlur = async () => {
    setEmailBlurred(true)
    await trigger('email')
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextField
        className={s.emailInput}
        control={control}
        label={labels.email}
        name={'email'}
        /*onBlur={handleEmailBlur}*/
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
        error={
          errors.password?.message ||
          /*emailBlurred && */ (errors.email &&
            'The email or password are incorrect. Try again please')
        }
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
