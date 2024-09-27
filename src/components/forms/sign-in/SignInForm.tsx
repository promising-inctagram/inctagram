import { useForm } from 'react-hook-form'

import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { AuthSocial } from '@/components/forms/sign-in/authSocial/authSocial'
import { TextField } from '@/components/text-field'
import { Typography } from '@/components/typography'

type LoginFields = {
  email: string
  password: string
}

// todo: подумать куда вынести enum
enum PathsAuth {
  passwordRecovery = '',
}

export const SignInForm = () => {
  const { handleSubmit, register } = useForm<LoginFields>()

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Card>
      <Typography>Sign In</Typography>
      <AuthSocial />
      <form onSubmit={onSubmit}>
        <TextField
          {...register('email')}
          isRequired
          label={'Email'}
          placeholder={'Epam@epam.com'}
          variant={'text'}
        />
        <TextField
          {...register('password')}
          isRequired
          label={'Password'}
          placeholder={'**********'}
          variant={'password'}
        />
        <Typography as={'link'} href={PathsAuth.passwordRecovery}>
          Forgot Password
        </Typography>
        <Button type={'submit'}>Sign In</Button>
        <Typography>Don’t have an account?</Typography>
        <Typography as={'link'} href={'https://www.google.by'}>
          Sign Up
        </Typography>
      </form>
    </Card>
  )
}
