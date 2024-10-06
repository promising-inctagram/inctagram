import { LocaleType } from '@/locales/en'
import { confirmEmailPage } from '@/locales/ru/confirm-email-page'
import { confirmLogoutPage } from '@/locales/ru/confirm-logout-page'
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
  logoutConfirmation: confirmLogoutPage,
  privacyPolicyPage: privacyPolicyPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
