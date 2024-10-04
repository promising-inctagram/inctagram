import { LocaleValidation } from '@/locales/en'
import {
  confirmPasswordScheme,
  emailScheme,
  passwordScheme,
  userNameScheme,
} from '@/shared/validation-schemes'
import { ZodErrorMap, z } from 'zod'

/**
 * Creates a custom errorMap for signUpForm
 */
const createSignUpErrorMap =
  (t: LocaleValidation): ZodErrorMap =>
  (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (issue.expected === 'string' && issue.received === 'undefined') {
        return { message: t.requiredField }
      }
    }

    return { message: ctx.defaultError }
  }

/**
 * Creates a Zod schema for signUpForm
 */
export const signUpSchemeCreator = (t: LocaleValidation) => {
  // Create a custom errorMap taking into account localisation a
  const signUpErrorMap = createSignUpErrorMap(t)

  // Set custom errorMap globally into Zod
  z.setErrorMap(signUpErrorMap)

  return z
    .object({
      confirmPassword: confirmPasswordScheme,
      email: emailScheme(t.email),
      name: userNameScheme(t.userName),
      password: passwordScheme(t.password),
      termsAgreement: z.boolean().default(false),
    })
    .refine(val => val.password === val.confirmPassword, {
      message: t.passwordsMatch,
      path: ['confirmPassword'],
    })
    .refine(val => val.termsAgreement, {
      message: t.agreeToTerms,
      path: ['termsAgreement'],
    })
}
