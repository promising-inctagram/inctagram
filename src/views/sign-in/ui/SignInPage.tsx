import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { LoginArgs, SignInForm } from '@/views/sign-in/ui/SignInForm'
import { AuthSocial } from '@/views/sign-in/ui/authSocial/authSocial'
import Link from 'next/link'

import s from './SignIn.module.scss'

function SignInPage() {
  const { t } = useTranslation()
  const { accountExistsQuestion, linkToSignUp, pageTitle } = t.signInPage

  const onSubmit = async (args: LoginArgs) => {
    console.log(args)
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
