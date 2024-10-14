import { LocaleValidation } from '@/locales/en'
import { confirmPasswordScheme, passwordScheme } from '@/shared/lib/validations'
import { z } from 'zod'

export const createNewPasswordSchemeCreator = (t: LocaleValidation) => {
  return z
    .object({
      confirmPassword: confirmPasswordScheme,
      password: passwordScheme(t.password),
      recoveryCode: z.string().min(1),
    })
    .refine(val => val.password === val.confirmPassword, {
      message: t.passwordsMatch,
      path: ['confirmPassword'],
    })
}
