import { Page } from '@/components'
import { Card, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import { CreateNewPasswordForm } from '@/views/create-new-password/ui/CreateNewPasswordForm'

import styles from './CreateNewPassword.module.scss'

type CreateNewPasswordProps = {
  setIsLinkExpired: (value: boolean) => void
}

export const CreateNewPassword = ({ setIsLinkExpired }: CreateNewPasswordProps) => {
  const { t } = useTranslation()
  const { pageTitle } = t.passwordRecoveryPage.createNewPassword

  return (
    <Page mt={'60px'}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <CreateNewPasswordForm setIsLinkExpired={setIsLinkExpired} />
        </Card>
      </div>
    </Page>
  )
}
