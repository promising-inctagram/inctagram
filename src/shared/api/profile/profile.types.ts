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
  dateOfBirth?: Date | null
  firstName: null | string
  lastName: null | string
  userName: null | string
}
