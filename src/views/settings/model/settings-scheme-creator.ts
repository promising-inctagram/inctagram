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
    aboutMe: z.string(),
    city: z.string(),
    country: z.string(),
    dateOfBirth: dateOfBirthScheme(t.dateOfBirth),
    firstName: firstNameScheme(t.firstName),
    lastName: lastNameScheme(t.lastName),
    username: userNameScheme(t.userName),
  })
}
