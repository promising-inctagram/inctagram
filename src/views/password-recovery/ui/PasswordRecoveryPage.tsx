import { Page, getLayout } from '@/components'
import { Button, TimeManagementIllustration, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import Link from 'next/link'

import styles from './PasswordRecoveryPage.module.scss'

export default function PasswordRecoveryPage() {
  const { t } = useTranslation()
  const { pageButton, pageTitle, textContent } = t.passwordRecoveryPage.passwordRecoveryPage

  return (
    <Page mt={'35px'}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <Typography className={styles.textContent} variant={'regular_text_16'}>
            {textContent}
          </Typography>
          <Button as={Link} href={Paths.forgotPassword}>
            {pageButton}
          </Button>
        </div>
        <TimeManagementIllustration />
      </div>
    </Page>
  )
}

PasswordRecoveryPage.getLayout = getLayout
