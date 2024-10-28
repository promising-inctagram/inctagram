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

export type sendPasswordRecoveryEmailArgs = {
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
export type ResponseWithAccessToken = {
  accessToken: string
}
export type MeResponse = {
  createdAt: string
  email: string
  id: string
  profile?: Profile
  username: string
}
export type Profile = {}
//todo:вынести отдельно в profile.types
