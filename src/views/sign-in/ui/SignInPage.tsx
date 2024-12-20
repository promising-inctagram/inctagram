import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks/useTranslations'
import { SignInForm } from '@/views/sign-in/ui/SignInForm'
import { OAuthIcons } from '@/views/sign-in/ui/oAuthIcons/OAuthIcons'
import Link from 'next/link'

import s from './SignIn.module.scss'

function SignInPage() {
  const { t } = useTranslation()
  const { accountExistsQuestion, linkToSignUp, pageTitle } = t.signInPage

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            {pageTitle}
          </Typography>
          <OAuthIcons />
          <SignInForm />
          <Typography className={s.paragraph} variant={'regular_text_16'}>
            {accountExistsQuestion}
          </Typography>
          <Button as={Link} href={Paths.signUp} variant={'link'}>
            {linkToSignUp}
          </Button>
        </Card>
      </div>
    </Page>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
