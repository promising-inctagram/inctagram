import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/controlled-checkbox'
import { ControlledTextField } from '@/components/controlled-text-field'
import { Button } from '@/components/ui'
import { useCreateUserMutation } from '@/shared/api/auth/auth.api'
import { useTranslation } from '@/shared/hooks'
import { getErrorMessageData } from '@/shared/utils/get-error-message-data'
import { signUpSchemeCreator } from '@/views/sign-up/model/sign-up-scheme-creator'
import { SignUpFields } from '@/views/sign-up/model/types'
import { SentEmailDialog } from '@/views/sign-up/ui/SentEmailDialog'
import { TermsAgreementLabel } from '@/views/sign-up/ui/TermsAgreementLabel'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './SignUpFrom.module.scss'

export const SignUpForm = () => {
  const { t } = useTranslation()
  const { emailSentDialog, labels, placeholders, policy, submitButton, terms, termsAgreement } =
    t.signUpPage.signUpForm

  const [showDialog, setShowDialog] = useState(false)
  const [email, setEmail] = useState('')
  const [createUser] = useCreateUserMutation()

  const {
    control,
    formState: { isDirty, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<SignUpFields>({
    defaultValues: {
      agreement: false,
      confirmPassword: '',
      email: '',
      password: '',
      username: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchemeCreator(t.validation)),
  })

  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError('confirmPassword', { message: t.validation.passwordsMatch })
    } else {
      setError('confirmPassword', { message: '' })
    }
  }, [password, confirmPassword, setError, t.validation.passwordsMatch])

  const isSubmitDisabled = !isValid || !isDirty

  const formHandler = handleSubmit(async data => {
    setEmail(data.email)
    try {
      await createUser(data).unwrap()
      setShowDialog(true)
      reset()
    } catch (e) {
      const errors = getErrorMessageData(e)

      if (typeof errors !== 'string') {
        errors.forEach(el => {
          setError(el.field as keyof SignUpFields, { message: el.message })
        })
      }
    }
  })

  return (
    <>
      <form className={s.form} onSubmit={formHandler}>
        <div className={s.textFieldContainer}>
          <ControlledTextField
            control={control}
            label={labels.name}
            name={'username'}
            placeholder={placeholders.addUsername}
          />
          <ControlledTextField
            control={control}
            label={labels.email}
            name={'email'}
            placeholder={placeholders.addEmail}
          />
          <ControlledTextField
            control={control}
            label={labels.password}
            name={'password'}
            placeholder={placeholders.createPassword}
            variant={'password'}
          />
          <ControlledTextField
            control={control}
            label={labels.confirmPassword}
            name={'confirmPassword'}
            placeholder={placeholders.repeatPassword}
            variant={'password'}
          />
        </div>
        <ControlledCheckbox
          control={control}
          label={
            <TermsAgreementLabel policy={policy} terms={terms} termsAgreement={termsAgreement} />
          }
          name={'agreement'}
        />
        <Button className={s.signUpBtn} disabled={isSubmitDisabled} type={'submit'}>
          {submitButton}
        </Button>
      </form>
      <SentEmailDialog
        email={email}
        isOpen={showDialog}
        onOpenChange={setShowDialog}
        overlayStyles={s.overlay}
        t={emailSentDialog}
      />
    </>
  )
}
