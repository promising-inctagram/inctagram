import { Page, getLayout } from '@/components'
import { Button, SignUpConfirmedIllustration, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import link from 'next/link'

import s from './ConfirmEmailPage.module.scss'

function ConfirmPasswordEmail() {
  const { t } = useTranslation()
  const { caption, signInButton, title } = t.confirmEmailPage

  return (
    <Page mt={'36px'}>
      <div className={s.container}>
        <Typography as={'h1'} variant={'h1'}>
          {title}
        </Typography>
        <Typography variant={'regular_text_16'}>{caption}</Typography>
        <Button as={link} className={s.button} href={Paths.logIn}>
          {signInButton}
        </Button>
        <SignUpConfirmedIllustration className={s.image} />
      </div>
    </Page>
  )
}

ConfirmPasswordEmail.getLayout = getLayout
export default ConfirmPasswordEmail
