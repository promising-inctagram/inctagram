import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { SignInForm } from '@/views/sign-in/ui/SignInForm'
import { AuthSocial } from '@/views/sign-in/ui/authSocial/authSocial'
import Link from 'next/link'

import s from './SignIn.module.scss'

export type LoginArgs = {
  email: string
  password: string
}

function SignInPage() {
  const { t } = useTranslation()
  const { accountExistsQuestion, linkToSignUp, pageTitle } = t.signInPage
  const onSubmit = (data: LoginArgs) => {
    console.log(data)
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
