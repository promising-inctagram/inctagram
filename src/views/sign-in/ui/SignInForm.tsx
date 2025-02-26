import { useEffect } from 'react'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useLoginMutation, useMeQuery } from '@/shared/api/auth/auth.api'
import { ACCESS_TOKEN } from '@/shared/constants'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { useLoginValidation } from '@/views/sign-in/model/hooks/useLoginValidation'
import { router } from 'next/client'
import Link from 'next/link'

import s from './SignIn.module.scss'

export const SignInForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit, isValid, setError } = useLoginValidation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm
  const { data: meId, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading && meId) {
      router.push(`/profile/${meId}`)
      console.log('dasdsa')
    }
  }, [meId])

  const [login] = useLoginMutation()

  const formHandler = handleSubmit(async data => {
    try {
      const resData = await login(data).unwrap()

      if (resData) {
        const accessToken = resData.accessToken

        localStorage.setItem(ACCESS_TOKEN, accessToken)
      }
    } catch (err: unknown) {
      const errorsMessage = getErrorMessageData(err)

      if (typeof errorsMessage === 'string') {
        setError('password', { message: errorsMessage })
      }
    }
  })

  return (
    <form className={s.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={labels.email}
        name={'email'}
        placeholder={placeholders.addEmail}
      />
      <ControlledTextField
        control={control}
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
