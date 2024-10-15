import { getLayout } from '@/components/layout/layout'
import { Page } from '@/components/page'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { AuthSocial } from '@/views/sign-in/ui/authSocial/authSocial'
import { SignUpForm } from '@/views/sign-up/ui/SignUpForm'
import Link from 'next/link'

import s from './SignUpPage.module.scss'

function SignUpPage() {
  const { t } = useTranslation()
  const { accountExistsQuestion, githubButton, googleButton, linkToSignIn, pageTitle } =
    t.signUpPage

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <AuthSocial />
          <SignUpForm />
          <div className={s.footer}>
            <Typography variant={'regular_text_16'}>{accountExistsQuestion}</Typography>
            <Button as={Link} href={Paths.logIn} variant={'link'}>
              {linkToSignIn}
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  )
}

SignUpPage.getLayout = getLayout
export default SignUpPage
