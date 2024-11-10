import { LocaleSettingsValidation } from '@/locales/en'
import { DATE_OF_BIRTH_REGEX } from '@/shared/constants'
import { firstNameScheme, lastNameScheme, userNameScheme } from '@/shared/lib/validations'
import { isBefore, parse, subYears } from 'date-fns'
import { z } from 'zod'

export const settingsSchemeCreator = (t: LocaleSettingsValidation) => {
  return z.object({
    aboutMe: z.string(),
    city: z.string(),
    country: z.string(),
    // dateOfBirth: dateOfBirthScheme(t.dateOfBirth),
    dateOfBirth: z.date({ message: 'Введите корректную дату рождения' }),
    // .refine(date => isBefore(date, subYears(new Date(), 13)), {
    //   message: 'User must be at least 13 years old',
    // }),

    firstName: firstNameScheme(t.firstName),
    lastName: lastNameScheme(t.lastName),
    username: userNameScheme(t.userName),
  })
}
