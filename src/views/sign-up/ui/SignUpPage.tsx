import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { GithubIcon, GoogleIcon } from '@/components/ui/icons'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { SignUpFields } from '@/views/sign-up/model/types'
import { SignUpForm } from '@/views/sign-up/ui/SignUpForm'
import Link from 'next/link'

import s from './SignUpPage.module.scss'

function SignUpPage() {
  const { t } = useTranslation()
  const { accountExistsQuestion, linkToSignIn, pageTitle } = t.signUpPage

  const formSubmitHandler = (data: SignUpFields) => {
    console.log(data)
  }

  return (
    <Page>
      <div className={s.container}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <div className={s.socials}>
            <Button className={s.socialsButton} variant={'icon'}>
              <GithubIcon className={s.icon} />
            </Button>
            <Button className={s.socialsButton} variant={'icon'}>
              <GoogleIcon className={s.icon} />
            </Button>
          </div>
          <SignUpForm onSubmit={formSubmitHandler} />
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
