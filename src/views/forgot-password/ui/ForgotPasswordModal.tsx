import { Button, Card, Typography } from '@/components/ui'
import { CloseIcon } from '@/components/ui/icons'
import { useTranslation } from '@/shared/hooks'

import styles from './ForgotPasswordModal.module.scss'

interface ForgotPasswordModalProps {
  setIsModal: (value: boolean) => void
}

export const ForgotPasswordModal = ({ setIsModal }: ForgotPasswordModalProps) => {
  const { t } = useTranslation()
  const { modalText, modalTitle } = t.passwordRecoveryPage.forgotPasswordModalPage

  const handleModalPage = () => {
    setIsModal(false)
  }

  return (
    <div className={styles.wrapper}>
      <Card className={styles.container}>
        <div className={styles.header}>
          <Typography as={'h1'} variant={'h1'}>
            {modalTitle}
          </Typography>
          <Button onClick={handleModalPage} variant={'icon'}>
            <CloseIcon />
          </Button>
        </div>
        <div className={styles.main}>
          <Typography variant={'regular_text_16'}>{modalText}</Typography>
          <div className={styles.buttonContainer}>
            <Button onClick={handleModalPage}>OK</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
