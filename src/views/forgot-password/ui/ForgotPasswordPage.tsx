import { useState } from 'react'

import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ForgotPasswordForm, formTypes } from '@/views/forgot-password/ui/ForgotPasswordForm'
import { ForgotRecaptcha } from '@/views/forgot-password/ui/ForgotRecaptcha'
import Link from 'next/link'

import styles from './ForgotPasswordPage.module.scss'

import { ForgotPasswordModal } from './ForgotPasswordModal'

export default function ForgotPasswordPage() {
  const [token, setToken] = useState<null | string>(null)
  const [error, setError] = useState('')
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false)
  const { t } = useTranslation()
  const { pageLink, pageTitle } = t.passwordRecoveryPage.forgotPasswordPage

  const formSubmitHandler = (data: formTypes) => {
    if (token) {
      console.log(data.email)
      console.log(token)
      setIsMessageSent(true)
    } else {
      console.log(token)
      console.log('error')
    }
  }

  return (
    <Page mt={'72px'}>
      <div className={styles.container}>
        <Card className={styles.card}>
          {true && <ForgotPasswordModal />}
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <ForgotPasswordForm
            isMessageSent={isMessageSent}
            onSubmit={formSubmitHandler}
            setIsMessageSent={setIsMessageSent}
          />
          <Button as={Link} className={styles.button} href={Paths.logIn} variant={'link'}>
            {pageLink}
          </Button>
          <ForgotRecaptcha error={error} setError={setError} setToken={setToken} />
        </Card>
      </div>
    </Page>
  )
}

ForgotPasswordPage.getLayout = getLayout
