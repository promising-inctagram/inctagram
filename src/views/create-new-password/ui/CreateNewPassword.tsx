import { Page } from '@/components'
import { Card, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import { CreateNewPasswordForm } from '@/views/create-new-password/ui/CreateNewPasswordForm'

import styles from './CreateNewPassword.module.scss'

type CreateNewPasswordProps = {
  recoveryCode: string
  setIsLinkExpired: (value: boolean) => void
}

export const CreateNewPassword = ({ recoveryCode, setIsLinkExpired }: CreateNewPasswordProps) => {
  const { t } = useTranslation()
  const { pageTitle } = t.passwordRecoveryPage.createNewPassword

  return (
    <Page pt={'60px'}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <CreateNewPasswordForm recoveryCode={recoveryCode} setIsLinkExpired={setIsLinkExpired} />
        </Card>
      </div>
    </Page>
  )
}
