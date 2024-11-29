type Country = {
  id: number
  name_en: string
  name_ru: string
}

type City = {
  countryId: number
  id: number
  name_en: string
  name_ru: string
}

type AvatarInfo = {
  id: string
  mediumFilePath: string
  originFilePath: string
  smallFilePath: string
}

type Profile = {
  aboutMe: string
  avatarInfo: AvatarInfo
  city: City
  country: Country
  dateOfBirth: string
  firstName: string
  lastName: string
}

export type User = {
  createdAt: string
  email: string
  id: string
  profile: Profile
  username: string
}
