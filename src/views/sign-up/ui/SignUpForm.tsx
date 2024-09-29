import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/controlled-checkbox'
import { ControlledTextField } from '@/components/controlled-text-field'
import { Button } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'
import { TermsAgreementLabel } from '@/views/sign-up/ui/TermsAgreementLabel'

import s from './SignUpFrom.module.scss'

type SignUpFormProps = {
  // todo: fix any
  onSubmit: (formData: any) => void
}
export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const { t } = useTranslation()
  const { labels, placeholders, policy, submitButton, terms, termsAgreement } =
    t.signUpPage.signUpForm

  const { control, handleSubmit } = useForm()

  const formHandler = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={s.form} onSubmit={formHandler}>
      <div className={s.textFieldContainer}>
        <ControlledTextField
          control={control}
          label={labels.name}
          name={'name'}
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
        name={'termsAgreement'}
      />
      <Button fullWidth>{submitButton}</Button>
    </form>
  )
}
