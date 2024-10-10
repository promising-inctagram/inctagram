import { LocaleType } from '@/locales/en'
import { signInPage } from '@/locales/en/sign-in-page'
import { confirmEmailPage } from '@/locales/ru/confirm-email-page'
import { passwordRecoveryPage } from '@/locales/ru/password-recovery-page'
import { privacyPolicyPage } from '@/locales/ru/privacy-policy-page'
import { signUpPage } from '@/locales/ru/sign-up-page'
import { termsOfServicePage } from '@/locales/ru/terms-of-service-page'
import { validation } from '@/locales/ru/validation'

export const ru: LocaleType = {
  confirmEmailPage: confirmEmailPage,
  language: {
    en: 'Английский',
    ru: ' Русский',
  },
  passwordRecoveryPage: passwordRecoveryPage,
  privacyPolicyPage: privacyPolicyPage,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
