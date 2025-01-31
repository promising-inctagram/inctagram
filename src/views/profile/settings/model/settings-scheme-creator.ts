import { useEffect } from 'react'

import { LocaleSettingsValidation } from '@/locales/en'
import {
  aboutMeValidate,
  dateOfBirthScheme,
  firstNameScheme,
  lastNameScheme,
  userNameScheme,
} from '@/shared/lib/validations'
import { z } from 'zod'

export type aboutMeType = 'primary' | 'secondary'

export const settingsSchemeCreator = (t: LocaleSettingsValidation, aboutMe: aboutMeType) => {
  return z.object({
    aboutMe: aboutMe === 'secondary' ? aboutMeValidate(t.aboutMe) : z.any().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: dateOfBirthScheme(t.dateOfBirth),
    firstName: firstNameScheme(t.firstName),
    lastName: lastNameScheme(t.lastName),
    username: userNameScheme(t.userName),
  })
}
