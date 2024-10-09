import { useState } from 'react'

import { Page, getLayout } from '@/components'
import { Button, Card, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { ForgotPasswordForm } from '@/views/forgot-password/ui/ForgotPasswordForm'
import { ForgotRecaptcha } from '@/views/forgot-password/ui/ForgotRecaptcha'
import Link from 'next/link'

import styles from './ForgotPasswordPage.module.scss'

import { ForgotPasswordModal } from './ForgotPasswordModal'

export default function ForgotPasswordPage() {
  const [token, setToken] = useState<null | string>(null)
  const [error, setError] = useState('')
  const [isModal, setIsModal] = useState<boolean>(false)
  const { t } = useTranslation()
  const { pageLink, pageTitle } = t.passwordRecoveryPage.forgotPasswordPage

  return (
    <Page mt={'72px'}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <ForgotPasswordModal isOpen={isModal} setIsModal={setIsModal} />
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <ForgotPasswordForm setIsModal={setIsModal} token={token} />
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
