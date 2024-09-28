import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { GithubIcon, GoogleIcon } from '@/components/ui/icons'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { SignUpForm } from '@/views/sign-up/ui/SignUpForm'
import Link from 'next/link'

import s from './SignUpPage.module.scss'

function SignUpPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {t.signUpPage.pageTitle}
          </Typography>
          <div className={s.socials}>
            <Button className={s.socialsButton} variant={'icon'}>
              <GithubIcon className={s.icon} />
            </Button>
            <Button className={s.socialsButton} variant={'icon'}>
              <GoogleIcon className={s.icon} />
            </Button>
          </div>
          <SignUpForm />
          <div className={s.footer}>
            <Typography variant={'regular_text_16'}>
              {t.signUpPage.accountExistsQuestion}
            </Typography>
            <Button as={Link} href={Paths.logIn} variant={'link'}>
              {t.signUpPage.linkToSignIn}
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  )
}

SignUpPage.getLayout = getLayout
export default SignUpPage
