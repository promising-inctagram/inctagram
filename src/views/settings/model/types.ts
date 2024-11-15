import { settingsSchemeCreator } from '@/views/settings/model/settings-scheme-creator'
import { z } from 'zod'

export type SettingFields = z.infer<ReturnType<typeof settingsSchemeCreator>>

export type SettingsFormProps = {
  aboutMe: string
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  username: string
}
