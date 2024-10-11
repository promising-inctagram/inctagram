import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, Typography } from '@/components/ui'
import { useSentEmailMutation } from '@/shared/api/auth/auth.api'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from './ForgotPasswordForm.module.scss'

import { forgotPasswordSchemeCreator } from '../model/forgot-password-scheme-creator'
import { ForgotPasswordFields } from '../model/types'

interface ForgotPasswordFormProps {
  setIsModal: (value: boolean) => void
  token: null | string
}

export const ForgotPasswordForm = ({ setIsModal, token }: ForgotPasswordFormProps) => {
  const { t } = useTranslation()
  const { formButton, formContent, sentLinkText } = t.passwordRecoveryPage.forgotPasswordPage
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false)
  const [sentEmail] = useSentEmailMutation()

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<ForgotPasswordFields>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(forgotPasswordSchemeCreator(t.validation)),
  })

  const formHandler = handleSubmit(async (data: ForgotPasswordFields) => {
    try {
      const res = await sentEmail(data).unwrap()

      setIsMessageSent(true)
      setIsModal(true)
      reset()
      console.log(res)
      console.log('resolve')
    } catch (e) {
      const errors = getErrorMessageData(e)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          setError(el.field as keyof ForgotPasswordFields, { message: el.message })
        })
      }
    }
    // console.log(token) токен рекапчи
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
