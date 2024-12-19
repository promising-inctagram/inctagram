import { Nullable } from '@/shared/types'

export type Profile = {
  aboutMe: null | string
  avatar: Avatar | null
  city: null | string
  country: null | string
  dateOfBirth: null | string
  firstName: null | string
  lastName: null | string
}

export type Avatar = {
  createdAt: null | string
  id: string
  originalUrl: string
  smallUrl: string
  updatedAt: null | string
}
export type AvatarDto = {
  file: File
}

export type UpdateProfileArgs = {
  aboutMe?: null | string
  city?: null | string
  country?: null | string
  dateOfBirth?: Date | string | undefined
  firstName: null | string
  lastName: null | string
  username: null | string
}

export type Country = {
  id: number
  name_en: string
  name_ru: string
}

export type City = {
  countryId: number | string
  id: number
  name_en: string
  name_ru: string
}

export type GetUserProfileArgs = {
  id: string
}

export type ResponseGetUserProfile = {
  avatarInfo: GetUserProfileAvatarInfo
  createdAt: string
  email: string
  id: string
  profile: GetUserProfileProfileInfo
  username: string
}

export type GetUserProfileAvatarInfo = {
  id: string
  mediumFilePath: string
  originFilePath: string
  smallFilePath: string
}

export type GetUserProfileProfileInfo = {
  aboutMe: Nullable<string>
  avatarInfo: GetUserProfileAvatarInfo
  city: Nullable<string>
  country: Nullable<string>
  dateOfBirth: Nullable<string>
  firstName: string
  lastName: string
}
