import { Page, getLayout } from '@/components'
import { Card, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import {
  CreateNewPasswordForm,
  formTypes,
} from '@/views/create-new-password/ui/CreateNewPasswordForm'

import styles from './CreateNewPasswordPage.module.scss'

export default function PasswordRecoveryPage() {
  const { t } = useTranslation()
  const { pageTitle } = t.passwordRecoveryPage.createNewPassword

  const formSubmitHandler = (data: formTypes) => {
    console.log(data)
  }

  return (
    <Page mt={'60px'}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <Typography as={'h1'} variant={'h1'}>
            {pageTitle}
          </Typography>
          <CreateNewPasswordForm onSubmit={formSubmitHandler} />
        </Card>
      </div>
    </Page>
  )
}

PasswordRecoveryPage.getLayout = getLayout
