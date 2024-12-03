import { LocaleSettingsValidation } from '@/locales/en'
import {
  dateOfBirthScheme,
  firstNameScheme,
  lastNameScheme,
  userNameScheme,
} from '@/shared/lib/validations'
import { z } from 'zod'

export const settingsSchemeCreator = (t: LocaleSettingsValidation) => {
  return z.object({
    aboutMe: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: dateOfBirthScheme(t.dateOfBirth),
    firstName: firstNameScheme(t.firstName),
    lastName: lastNameScheme(t.lastName),
    username: userNameScheme(t.userName),
  })
}
