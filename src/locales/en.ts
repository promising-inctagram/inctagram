import { passwordRecoveryPage } from '@/locales/en/password-recovery'
import { privacyPolicyPage } from '@/locales/en/privacy-policy-page'
import { signUpPage } from '@/locales/en/sign-up-page'
import { termsOfServicePage } from '@/locales/en/terms-of-service-page'
import { validation } from '@/locales/en/validation'

export type LocaleType = typeof en
export type LocaleValidation = typeof en.validation
export type LocaleValidationUserName = typeof en.validation.userName
export type LocaleValidationPassword = typeof en.validation.password

export const en = {
  language: {
    en: 'English',
    ru: ' Russian',
  },
  passwordRecoveryPage: passwordRecoveryPage,
  privacyPolicyPage: privacyPolicyPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
