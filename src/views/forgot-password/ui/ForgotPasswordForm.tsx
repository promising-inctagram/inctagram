import { useState } from 'react'
import Recaptcha from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useSentEmailMutation } from '@/shared/api/auth/auth.api'
import { Paths } from '@/shared/enums'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import styles from './ForgotPasswordForm.module.scss'

import { forgotPasswordSchemeCreator } from '../model/forgot-password-scheme-creator'
import { ForgotPasswordFields } from '../model/types'

interface ForgotPasswordFormProps {
  setEmail: (email: string) => void
  setIsModal: (value: boolean) => void
}

export const ForgotPasswordForm = ({ setEmail, setIsModal }: ForgotPasswordFormProps) => {
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false)
  const { t } = useTranslation()
  const { formButton, formContent, pageLink, sentLinkText } =
    t.passwordRecoveryPage.forgotPasswordPage
  const [sentEmail] = useSentEmailMutation()
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setError,
    setValue,
    trigger,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: '',
      tokenRecaptcha: '',
    },
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async (data: ForgotPasswordFields) => {
    try {
      setEmail(data.email)
      await sentEmail(data).unwrap()

      setIsMessageSent(true)
      setIsModal(true)
      reset()
    } catch (e) {
      const errors = getErrorMessageData(e)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          setError(el.field as keyof ForgotPasswordFields, { message: el.message })
        })
      }
    }
  })

  const handleTokenChange = (token: null | string) => {
    setValue('tokenRecaptcha', token!)
    trigger()
  }

  return (
    <form className={styles.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={'Email'}
        name={'email'}
        placeholder={'Epam@epam.com'}
      />
      <Typography className={styles.text} variant={'regular_text_14'}>
        {formContent}
      </Typography>
      {isMessageSent && (
        <Typography className={styles.sentMessage} variant={'regular_text_14'}>
          {sentLinkText}
        </Typography>
      )}
      <Button disabled={!isValid} type={'submit'}>
        {formButton}
      </Button>
      <Button as={Link} className={styles.button} href={Paths.logIn} variant={'link'}>
        {pageLink}
      </Button>
      <Recaptcha hl={'en'} onChange={handleTokenChange} sitekey={sitekey} theme={'dark'} />
    </form>
  )
}
