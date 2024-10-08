import { useState } from 'react'

import { Button, SignUpConfirmedIllustration, Typography } from '@/components/ui'
import { LocaleLinkExpired } from '@/locales/en'
import { ResendLinkForm } from '@/views/confirm-email/ui/ResendLinkForm'

import s from '@/views/confirm-email/ui/ConfirmEmailPage.module.scss'

type LinkExpiredProps = {
  t: LocaleLinkExpired
}
export const LinkExpired = ({ t }: LinkExpiredProps) => {
  const { caption, resendButton, title } = t
  const [showEmailForm, setShowEmailForm] = useState(false)

  const resendEmailButtonHandler = () => {
    setShowEmailForm(true)
  }

  return (
    <>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {title}
      </Typography>
      <Typography className={s.caption} variant={'regular_text_16'}>
        {caption}
      </Typography>
      {!showEmailForm ? (
        <Button className={s.button} onClick={resendEmailButtonHandler}>
          {resendButton}
        </Button>
      ) : (
        <ResendLinkForm />
      )}
      <SignUpConfirmedIllustration className={s.image} />
    </>
  )
}
