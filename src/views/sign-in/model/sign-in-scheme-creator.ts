import { LocaleValidation } from '@/locales/en'
import {
  confirmPasswordScheme,
  emailScheme,
  passwordScheme,
  userNameScheme,
} from '@/shared/lib/validations'
import { ZodErrorMap, z } from 'zod'

export const signInSchemeCreator = (t: LocaleValidation) => {
  return z.object({
    email: emailScheme(t.email),
    password: passwordScheme(t.password),
  })
}
