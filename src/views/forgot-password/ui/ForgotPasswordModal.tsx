import { Button, Card, Typography } from '@/components/ui'
import { CloseIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'

import styles from './ForgotPasswordModal.module.scss'

export const ForgotPasswordModal = () => {
  const { t } = useTranslation()
  const { modalText, modalTitle } = t.passwordRecoveryPage.forgotPasswordModalPage

  return (
    <div className={styles.wrapper}>
      <Card className={styles.container}>
        <div className={styles.header}>
          <Typography as={'h1'} variant={'h1'}>
            {modalTitle}
          </Typography>
          <Button variant={'icon'}>
            <CloseIcon />
          </Button>
        </div>
        <div className={styles.main}>
          <Typography variant={'regular_text_16'}>{modalText}</Typography>
          <div className={styles.buttonContainer}>
            <Button>OK</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
