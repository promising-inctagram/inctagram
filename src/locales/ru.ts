import { LocaleType } from '@/locales/en'
import { confirmEmailPage } from '@/locales/ru/confirm-email-page'
import { confirmLogoutPage } from '@/locales/ru/confirm-logout-page'
import { passwordRecoveryPage } from '@/locales/ru/password-recovery-page'
import { privacyPolicyPage } from '@/locales/ru/privacy-policy-page'
import { profile } from '@/locales/ru/profile'
import { profileSettingPage } from '@/locales/ru/profile-setting-page'
import { profileSettingsDevices } from '@/locales/ru/profile-settings-devices'
import { signInPage } from '@/locales/ru/sign-in-page'
import { signUpPage } from '@/locales/ru/sign-up-page'
import { termsOfServicePage } from '@/locales/ru/terms-of-service-page'
import { validation } from '@/locales/ru/validation'

export const ru: LocaleType = {
  confirmEmailPage: confirmEmailPage,
  confirmLogoutPage: confirmLogoutPage,
  header: {
    loginButton: 'Войти',
    signUpButton: 'Зарегистрироваться',
  },
  language: {
    en: 'Английский',
    ru: ' Русский',
  },
  passwordRecoveryPage: passwordRecoveryPage,
  privacyPolicyPage: privacyPolicyPage,
  profile: profile,
  profileSettingPage: profileSettingPage,
  profileSettingsDevices: profileSettingsDevices,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
