import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { AppDispatch, useAppDispatch } from '@/lib/store'
import { useLoginMutation } from '@/shared/api/auth/auth.api'
import { LoginArgs } from '@/shared/api/auth/auth.types'
import { authActions } from '@/shared/api/auth/model/auth-slice'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { SignInForm } from '@/views/sign-in/ui/SignInForm'
import { AuthSocial } from '@/views/sign-in/ui/authSocial/authSocial'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

function SignInPage() {
  const { t } = useTranslation()
  const { accountExistsQuestion, linkToSignUp, pageTitle } = t.signInPage
  const [login] = useLoginMutation()
  const router = useRouter()

  const dispatch = useAppDispatch()

  const onSubmit = async (data: LoginArgs) => {
    try {
      const resData = await login(data).unwrap()

      if (resData) {
        const accessToken = resData.accessToken

        localStorage.setItem('accessToken', accessToken)

        await router.push(Paths.home)

        dispatch(authActions.setIsAuth(true))
      }

      dispatch(authActions.setError(null))
    } catch (err: unknown) {
      const { status } = err as FetchBaseQueryError
      const errorMessage = status === 401 ? t.validation.loginError : t.validation.unknownError

      dispatch(authActions.setError(errorMessage))
    }
  }

  return (
    <Page className={s.container} mt={36}>
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'}>
          {pageTitle}
        </Typography>
        <AuthSocial />
        <SignInForm onSubmit={onSubmit} />
        <Typography className={s.paragraph} variant={'regular_text_16'}>
          {accountExistsQuestion}
        </Typography>
        <Button as={Link} href={Paths.signUp} variant={'link'}>
          {linkToSignUp}
        </Button>
      </Card>
    </Page>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
