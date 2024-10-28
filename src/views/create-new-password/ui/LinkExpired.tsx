import { Page } from '@/components'
import { Button, TimeManagementIllustration, Typography } from '@/components/ui'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { useRouter } from 'next/router'

import styles from './LinkExpired.module.scss'

export default function LinkExpired() {
  const { t } = useTranslation()
  const { pageButton, pageTitle, textContent } = t.passwordRecoveryPage.passwordRecoveryPage
  const router = useRouter()

  const resendEmail = () => {
    router.push(Paths.forgotPassword)
  }

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
          <Button onClick={resendEmail}>{pageButton}</Button>
        </div>
        <TimeManagementIllustration />
      </div>
    </Page>
  )
}
