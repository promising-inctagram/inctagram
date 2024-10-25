import { useState } from 'react'

import { Page, getLayout } from '@/components'
import { Card, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import { ForgotPasswordForm } from '@/views/forgot-password/ui/ForgotPasswordForm'
import { SentEmailDialog } from '@/views/sign-up/ui/SentEmailDialog'

import styles from './ForgotPasswordPage.module.scss'

export default function ForgotPasswordPage() {
  const [isModal, setIsModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const { t } = useTranslation()
  const { forgotPasswordModalPage, forgotPasswordPage } = t.passwordRecoveryPage

  return (
    <Page mt={'72px'}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <SentEmailDialog
            email={email}
            isOpen={isModal}
            onOpenChange={setIsModal}
            overlayStyles={styles.overlay}
            t={forgotPasswordModalPage}
          />
          <Typography as={'h1'} variant={'h1'}>
            {forgotPasswordPage.pageTitle}
          </Typography>
          <ForgotPasswordForm setEmail={setEmail} setIsModal={setIsModal} />
        </Card>
      </div>
    </Page>
  )
}

ForgotPasswordPage.getLayout = getLayout
