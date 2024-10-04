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
  const { accountExistsQuestion, githubButton, googleButton, linkToSignIn, pageTitle } =
    t.signUpPage

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <div className={s.socials}>
            <Button className={s.socialsButton} title={githubButton} variant={'icon'}>
              <GithubIcon className={s.icon} />
            </Button>
            <Button className={s.socialsButton} title={googleButton} variant={'icon'}>
              <GoogleIcon className={s.icon} />
            </Button>
          </div>
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
