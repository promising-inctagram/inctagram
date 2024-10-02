import { FormEvent } from 'react'

import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { useLoginMutation } from '@/services/instagram.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { LoginArgs, SignInForm } from '@/views/sign-in/ui/SignInForm'
import { AuthSocial } from '@/views/sign-in/ui/authSocial/authSocial'
import Link from 'next/link'

import s from './SignIn.module.scss'

function SignInPage() {
  const { t } = useTranslation()
  const { accountExistsQuestion, linkToSignUp, pageTitle } = t.signInPage
  const [login, { isLoading }] = useLoginMutation()

  if (isLoading) {
    return <h1>...Loading</h1>
  }
  const onSubmit = async (args: LoginArgs) => {
    try {
      const data = await login(args).unwrap()
      // Успешный вход в систему
    } catch (err) {
      // Обработка ошибки
    }
    console.log(args)
  }

  return (
    <Page className={s.container} pt={36}>
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
