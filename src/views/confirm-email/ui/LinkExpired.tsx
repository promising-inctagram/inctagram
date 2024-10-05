import { Button, SignUpConfirmedIllustration, Typography } from '@/components/ui'
import { LocaleLinkExpired } from '@/locales/en'

import s from '@/views/confirm-email/ui/ConfirmEmailPage.module.scss'

type LinkExpiredProps = {
  onClick: () => void
  t: LocaleLinkExpired
}
export const LinkExpired = ({ onClick, t }: LinkExpiredProps) => {
  const { caption, resendButton, title } = t

  return (
    <>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {title}
      </Typography>
      <Typography className={s.caption} variant={'regular_text_16'}>
        {caption}
      </Typography>
      <Button className={s.button} onClick={onClick}>
        {resendButton}
      </Button>
      <SignUpConfirmedIllustration className={s.image} />
    </>
  )
}
