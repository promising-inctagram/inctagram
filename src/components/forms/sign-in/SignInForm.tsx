import { useForm } from 'react-hook-form'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { AuthSocial } from '@/components/forms/sign-in/authSocial/authSocial'
import { TextField } from '@/components/text-field'
import { Typography } from '@/components/typography'
import Link from 'next/link'

import s from './SignInForm.module.scss'

type LoginFields = {
  email: string
  password: string
}

// todo: подумать куда вынести enum
enum PathsAuth {
  passwordRecovery = '',
}

export const SignInCard = () => {
  const { handleSubmit, register } = useForm<LoginFields>()

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Card as={'form'} className={s.card} onSubmit={onSubmit}>
      <Typography as={'h1'} variant={'h1'}>
        Sign In
      </Typography>
      <AuthSocial />
      <TextField
        {...register('email')}
        className={s.emailInput}
        isRequired
        label={'Email'}
        placeholder={'Email'}
        variant={'text'}
      />
      <TextField
        {...register('password')}
        isRequired
        label={'Password'}
        placeholder={'Password'}
        variant={'password'}
      />
      <Typography as={Link} className={s.passwordLink} grey href={PathsAuth.passwordRecovery}>
        Forgot Password
      </Typography>
      <Button fullWidth type={'submit'}>
        Sign In
      </Button>
      <Typography className={s.paragraph} variant={'regular_text_16'}>
        Don’t have an account?
      </Typography>
      <Button as={Link} href={'https://www.google.by'} variant={'link'}>
        Sign Up
      </Button>
    </Card>
  )
}
