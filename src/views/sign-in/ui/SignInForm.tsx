import { FormEvent, useEffect, useState } from 'react'
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
  onSubmit: (args: LoginArgs) => void
}

const errorMessage = 'The email or password are incorrect. Try again please'

const loginSchema = z.object({
  email: z.string().trim().email({ message: errorMessage }),
  password: z.string({ message: errorMessage }).trim(),
})

export type LoginArgs = z.infer<typeof loginSchema>

export const SignInForm = ({ onSubmit }: Props) => {
  const { t } = useTranslation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginArgs>({
    resolver: zodResolver(loginSchema),
  })

  const errorMessages = [errors.email?.message, errors.password?.message].filter(Boolean).join(', ')

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit((args, e) => {
        if (e) {
          e.preventDefault()
          onSubmit(args)
        }
      })}
    >
      <ControlledTextField
        className={s.emailInput}
        control={control}
        label={labels.email}
        name={'email'}
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
        error={errorMessages}
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
