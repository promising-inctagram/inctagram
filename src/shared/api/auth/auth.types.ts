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

export type CreateNewPasswordArgs = {
  newPassword: string
  recoveryCode: string
}

export type CheckRecoveryCodeArgs = {
  recoveryCode: string
}
export type LoginArgs = {
  email: string
  password: string
}
export type LoginResponse = {
  accessToken: string
}

export type ResponseMe = {
  createdAt: string
  email: string
  id: string
  profile: ResponseMeProfile
  username: string
}
export type ResponseMeProfileAvatarData = {
  id: string
  mediumFilePath: string
  originFilePath: string
  smallFilePath: string
  userId: number
}
export type ResponseMeProfile = {
  aboutMe: string
  avatarInfo: ResponseMeProfileAvatarData
  city: {
    countryId: number
    id: number
    name_en: string
    name_ru: string
  }
  country: {
    id: number
    name_en: string
    name_ru: string
  }
  dateOfBirth: string
  firstName: string
  lastName: string
}
