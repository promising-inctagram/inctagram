import { LocaleSettingsValidation } from '@/locales/en'
import { MAX_ABOUT_ME_LENGTH, MIN_ABOUT_ME_LENGTH } from '@/shared/constants'
import {
  dateOfBirthScheme,
  firstNameScheme,
  lastNameScheme,
  userNameScheme,
} from '@/shared/lib/validations'
import { z } from 'zod'

export const settingsSchemeCreator = (t: LocaleSettingsValidation) => {
  return z.object({
    aboutMe: z
      .string()
      .min(MIN_ABOUT_ME_LENGTH, t.aboutMe.minLength)
      .max(MAX_ABOUT_ME_LENGTH, t.aboutMe.maxLength)
      .optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: dateOfBirthScheme(t.dateOfBirth),
    firstName: firstNameScheme(t.firstName),
    lastName: lastNameScheme(t.lastName),
    username: userNameScheme(t.userName),
  })
}
