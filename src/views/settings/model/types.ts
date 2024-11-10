import { settingsSchemeCreator } from '@/views/settings/model/settings-scheme-creator'
import { z } from 'zod'

export type SettingFields = z.infer<ReturnType<typeof settingsSchemeCreator>>
