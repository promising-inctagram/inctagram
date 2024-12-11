import { settingsSchemeCreator } from '@/views/profile/settings/model/settings-scheme-creator'
import { z } from 'zod'

export type SettingFields = z.infer<ReturnType<typeof settingsSchemeCreator>>

export type SettingsFormProps = {
  aboutMe: string
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
  username: string
}
