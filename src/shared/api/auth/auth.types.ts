export type CreateUserArgs = {
  agreement: boolean
  email: string
  password: string
  username: string
}

export type ConfirmEmailArgs = {
  code: string
}
export type ResendRegistrationArgs = {
  email: string
}

export type SentEmailArgs = {
  email: string
  token: string
}

export type createNewPasswordArgs = {
  newPassword: string
  recoveryCode: string
}

export type CheckRecoveryCodeArgs = {
  recoveryCode: string
}
export type LoginData = {
  email: string
  password: string
}
export type ResponseLogin = {
  accessToken: string
}
