import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from '@/components/controlled-checkbox'
import { ControlledTextField } from '@/components/controlled-text-field'
import { Button } from '@/components/ui'
import { useTranslation } from '@/shared/hooks'

import s from './SignUpFrom.module.scss'

type SignUpFormProps = {}
export const SignUpForm = (props: SignUpFormProps) => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm()

  const formHandler = handleSubmit(data => {
    console.log(data)
  })

  return (
    <form className={s.form} onSubmit={formHandler}>
      <div className={s.textFieldContainer}>
        <ControlledTextField
          control={control}
          label={t.signUpPage.signUpForm.labels.name}
          name={'name'}
          placeholder={t.signUpPage.signUpForm.placeholders.addUsername}
        />
        <ControlledTextField
          control={control}
          label={t.signUpPage.signUpForm.labels.email}
          name={'email'}
          placeholder={t.signUpPage.signUpForm.placeholders.addEmail}
        />
        <ControlledTextField
          control={control}
          label={t.signUpPage.signUpForm.labels.password}
          name={'password'}
          placeholder={t.signUpPage.signUpForm.placeholders.createPassword}
        />
        <ControlledTextField
          control={control}
          label={t.signUpPage.signUpForm.labels.confirmPassword}
          name={'confirmPassword'}
          placeholder={t.signUpPage.signUpForm.placeholders.repeatPassword}
        />
      </div>
      <ControlledCheckbox
        control={control}
        label={'I agree to the Terms of Service and Privacy Policy'}
        name={'serviceAgreement'}
      ></ControlledCheckbox>
      <Button fullWidth>{t.signUpPage.signUpForm.submitButton}</Button>
    </form>
  )
}
