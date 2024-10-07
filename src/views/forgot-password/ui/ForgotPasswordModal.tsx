import { Button, Card, Typography } from '@/components/ui'
import { CloseIcon } from '@/components/ui/icons'

import styles from './ForgotPasswordModal.module.scss'

export const ForgotPasswordModal = () => {
  return (
    <div className={styles.wrapper}>
      <Card className={styles.container}>
        <div className={styles.header}>
          <Typography as={'h1'} variant={'h1'}>
            Email sent
          </Typography>
          <Button variant={'icon'}>
            <CloseIcon />
          </Button>
        </div>
        <div className={styles.main}>
          <Typography variant={'regular_text_16'}>
            We have sent a link to confirm your email to epam@epam.com
          </Typography>
          <div className={styles.buttonContainer}>
            <Button>OK</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
