import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './ForgotPasswordForm.module.scss'

import { forgotPasswordSchemeCreator } from '../model/forgot-password-scheme-creator'
import { ForgotPasswordFields } from '../model/types'

interface ForgotPasswordFormProps {
  setIsModal: (value: boolean) => void
  token: null | string
}

export const ForgotPasswordForm = ({ setIsModal, token }: ForgotPasswordFormProps) => {
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false)
  const { t } = useTranslation()
  const { formButton, formContent, sentLinkText } = t.passwordRecoveryPage.forgotPasswordPage

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit((data: ForgotPasswordFields) => {
    if (token) {
      console.log(data.email)
      console.log(token)
      setIsMessageSent(true)
      setIsModal(true)
      reset()
    } else {
      console.log(token)
      console.log('error')
    }
  })

  const buttonDisabled = isValid && token

  return (
    <form className={styles.form} onSubmit={formHandler}>
      <ControlledTextField
        control={control}
        label={'Email'}
        name={'email'}
        placeholder={'Epam@epam.com'}
      />
      {/* todo :Если email не зарегистрирован : User with this email doesn't exist */}
      <Typography className={styles.text} variant={'regular_text_14'}>
        {formContent}
      </Typography>
      {isMessageSent && (
        <Typography className={styles.sentMessage} variant={'regular_text_14'}>
          {sentLinkText}
        </Typography>
      )}
      <Button disabled={!buttonDisabled} type={'submit'}>
        {formButton}
      </Button>
    </form>
  )
}
