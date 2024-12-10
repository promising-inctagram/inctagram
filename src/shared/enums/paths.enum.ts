export enum Paths {
  createPassword = '/auth/create-password',
  favourites = '/favourites',
  forgotPassword = '/auth/forgot-password',
  home = '/',
  logIn = '/auth/sign-in',
  messages = '/messages',
  passwordRecovery = '/auth/password-recovery',
  privacyPolicy = '/docs/privacy-policy',
  profile = '/profile',
  search = '/search',
  settings = '/settings',
  signUp = '/auth/sign-up',
  statistics = '/statistics',
  termsOfService = '/docs/terms-of-service',
}

export const getProfileSettingsPath = (id: string) => `/profile/${id}/settings`
