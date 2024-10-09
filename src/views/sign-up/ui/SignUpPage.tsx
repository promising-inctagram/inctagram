import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { GithubIcon, GoogleIcon } from '@/components/ui/icons'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { SignUpForm } from '@/views/sign-up/ui/SignUpForm'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './SignUpPage.module.scss'

function SignUpPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { accountExistsQuestion, githubButton, googleButton, linkToSignIn, pageTitle } =
    t.signUpPage

  const onGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/google`)
  }
  const onGithub = () => {
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/github`)
  }

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <div className={s.socials}>
            <Button
              className={s.socialsButton}
              onClick={onGithub}
              title={githubButton}
              variant={'icon'}
            >
              <GithubIcon className={s.icon} />
            </Button>
            <Button
              className={s.socialsButton}
              onClick={onGoogle}
              title={googleButton}
              variant={'icon'}
            >
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
