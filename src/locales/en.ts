import { confirmEmailPage } from '@/locales/en/confirm-email-page'
import { confirmLogoutPage } from '@/locales/en/confirm-logout-page'
import { createPost } from '@/locales/en/create-post'
import { passwordRecoveryPage } from '@/locales/en/password-recovery-page'
import { privacyPolicyPage } from '@/locales/en/privacy-policy-page'
import { profileSettingPage } from '@/locales/en/profile-setting-page'
import { profile } from '@/locales/en/profile'
import { profileSettingsDevices } from '@/locales/en/profile-settings-devices'
import { signInPage } from '@/locales/en/sign-in-page'
import { signUpPage } from '@/locales/en/sign-up-page'
import { termsOfServicePage } from '@/locales/en/terms-of-service-page'
import { validation } from '@/locales/en/validation'

export type LocaleType = typeof en
export type LocaleValidation = typeof en.validation
export type LocaleValidationUserName = typeof en.validation.userName
export type LocaleValidationPassword = typeof en.validation.password
export type LocaleEmailSentDialog = typeof en.signUpPage.signUpForm.emailSentDialog
export type LocaleEmailConfirmed = typeof en.confirmEmailPage.emailConfirmed
export type LocaleLinkExpired = typeof en.confirmEmailPage.linkExpired
export type LocaleSettingsForm = typeof en.profileSettingPage.settingsForm
export type LocaleSettingsValidation = typeof en.profileSettingPage.settingsForm.validation
export type LocaleValidationFirstName =
  typeof en.profileSettingPage.settingsForm.validation.firstName
export type LocaleValidationLastName = typeof en.profileSettingPage.settingsForm.validation.lastName

export const en = {
  confirmEmailPage: confirmEmailPage,
  confirmLogoutPage: confirmLogoutPage,
  createPost: createPost,
  header: {
    loginButton: 'Log in',
    signUpButton: 'Sign up',
  },
  language: {
    en: 'English',
    ru: ' Russian',
  },
  passwordRecoveryPage: passwordRecoveryPage,
  privacyPolicyPage: privacyPolicyPage,
  profileSettingPage: profileSettingPage,
  profile: profile,
  profileSettingsDevices: profileSettingsDevices,
  signInPage: signInPage,
  signUpPage: signUpPage,
  termsOfServicePage: termsOfServicePage,
  validation: validation,
}
