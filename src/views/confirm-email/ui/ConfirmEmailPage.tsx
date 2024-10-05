import { useEffect, useState } from 'react'

import { Page, getLayout } from '@/components'
import { BadRequestIllustration, showToast } from '@/components/ui'
import {
  useConfirmEmailMutation,
  useResendVerificationEmailMutation,
} from '@/shared/api/auth/auth.api'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { ConfirmedEmail } from '@/views/confirm-email/ui/ConfirmedEmail'
import { LinkExpired } from '@/views/confirm-email/ui/LinkExpired'
import { useRouter } from 'next/router'

import s from './ConfirmEmailPage.module.scss'

function ConfirmPasswordEmail() {
  const { t } = useTranslation()
  const { emailConfirmed, linkExpired } = t.confirmEmailPage

  const [isRequestCompleted, setIsRequestCompleted] = useState(false)
  const [confirmEmail, { isError, isSuccess }] = useConfirmEmailMutation()
  const [resendVerificationEmail] = useResendVerificationEmailMutation()

  const router = useRouter()
  const code = Array.isArray(router.query.code) ? router.query.code[0] : router.query.code

  useEffect(() => {
    if (code) {
      confirmEmail({ code })
        .unwrap()
        .catch(e => {
          const errors = getErrorMessageData(e)

          if (typeof errors !== 'string') {
            errors.forEach(el => {
              showToast({
                message: el.message,
                variant: 'error',
              })
            })
          }
        })
        .finally(() => setIsRequestCompleted(true))
    }
  }, [confirmEmail, code])

  const resendVerificationEmailHandler = () => {
    if (code) {
      resendVerificationEmail({ code })
    }
  }

  if (!isRequestCompleted) {
    return null
  }

  if (isError) {
    return (
      <Page mt={'36px'}>
        <div className={s.container}>
          <BadRequestIllustration />
        </div>
      </Page>
    )
  }

  return (
    <Page mt={'36px'}>
      <div className={s.container}>
        {isSuccess ? (
          <LinkExpired onClick={resendVerificationEmailHandler} t={linkExpired} />
        ) : (
          <ConfirmedEmail t={emailConfirmed} />
        )}
      </div>
    </Page>
  )
}

ConfirmPasswordEmail.getLayout = getLayout
export default ConfirmPasswordEmail
