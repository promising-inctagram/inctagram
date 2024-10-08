import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled-text-field'
import { Button, showToast } from '@/components/ui'
import { useResendRegistrationEmailMutation } from '@/shared/api/auth/auth.api'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { resendRegistrationEmailSchemeCreator } from '@/views/confirm-email/model/resend-registration-email-scheme-creator'
import { ResendLinkFields } from '@/views/confirm-email/model/types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './ResendLinkForm.module.scss'

export const ResendLinkForm = () => {
  const { t } = useTranslation()

  const { button, label, placeholder, successMessage } = t.confirmEmailPage.resendLinkForm

  const { control, handleSubmit, setError } = useForm<ResendLinkFields>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(resendRegistrationEmailSchemeCreator(t.validation)),
  })

  const [resendRegistrationEmail] = useResendRegistrationEmailMutation()

  const formHandler = handleSubmit(async data => {
    try {
      await resendRegistrationEmail(data).unwrap()
      showToast({
        message: `${successMessage} ${data.email}`,
      })
    } catch (e) {
      const errors = getErrorMessageData(e)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          setError(el.field as keyof ResendLinkFields, { message: el.message })
        })
      }
    }
  })

  return (
    <>
      <form className={s.form} onSubmit={formHandler}>
        <ControlledTextField
          control={control}
          label={label}
          name={'email'}
          placeholder={placeholder}
        />
        <Button type={'submit'}>{button}</Button>
      </form>
    </>
  )
}
