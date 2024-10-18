import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useLoginMutation } from '@/shared/api/auth/auth.api'
import { ACCESS_TOKEN_STORAGE_NAME } from '@/shared/constants'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { fetchErrorMessageData } from '@/shared/utils/fetch-error-message-data'
import { useLoginValidation } from '@/views/sign-in/model/hooks/useLoginValidation'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

export const SignInForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit, isValid, setError } = useLoginValidation()
  const { forgotPassword, labels, placeholders, submitButton } = t.signInPage.signInForm

  const [login] = useLoginMutation()
  const router = useRouter()

  const formHandler = handleSubmit(async data => {
    try {
      const resData = await login(data).unwrap()

      if (resData) {
        const accessToken = resData.accessToken

        localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, accessToken)

        await router.push(Paths.home)
      }
    } catch (err: unknown) {
      const errors = fetchErrorMessageData(err)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          setError(el.field, { message: el.message, type: 'manual' })
        })
      } else {
        setError('password', { message: errors, type: 'manual' })
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
