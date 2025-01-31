import {
  LocaleSettingsValidation,
  LocaleValidationAboutMe,
  LocaleValidationFirstName,
  LocaleValidationLastName,
  LocaleValidationPassword,
  LocaleValidationUserName,
} from '@/locales/en'
import {
  ABOUT_ME_REGEX,
  FIRST_NAME_REGEX,
  LAST_NAME_REGEX,
  MAX_ABOUT_ME_LENGTH,
  MAX_FIRST_NAME_LENGTH,
  MAX_LAST_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_FIRST_NAME_LENGTH,
  MIN_LAST_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '@/shared/constants'
import { z } from 'zod'

export const userNameScheme = (args: LocaleValidationUserName) =>
  z
    .string()
    .trim()
    .min(MIN_USERNAME_LENGTH, { message: args.minLength })
    .max(MAX_USERNAME_LENGTH, { message: args.maxLength })
    .regex(USERNAME_REGEX, {
      message: args.allowedSymbols,
    })

export const emailScheme = (message: string) => z.string().email({ message }).toLowerCase()

export const passwordScheme = (args: LocaleValidationPassword) =>
  z
    .string()
    .trim()
    .regex(/^\S*$/, { message: args.noWhiteSpace })
    .min(MIN_PASSWORD_LENGTH, { message: args.minLength })
    .max(MAX_PASSWORD_LENGTH, { message: args.maxLength })
    .refine(value => PASSWORD_REGEX.test(value), {
      message: args.mustContain,
    })

export const confirmPasswordScheme = z.string().trim()
// todo: Доделать схемы

export const firstNameScheme = (args: LocaleValidationFirstName) =>
  z
    .string()
    .trim()
    .min(MIN_FIRST_NAME_LENGTH, { message: args.minLength })
    .max(MAX_FIRST_NAME_LENGTH, { message: args.maxLength })
    .regex(FIRST_NAME_REGEX, { message: args.allowedSymbols })

export const lastNameScheme = (args: LocaleValidationLastName) =>
  z
    .string()
    .trim()
    .min(MIN_LAST_NAME_LENGTH, { message: args.minLength })
    .max(MAX_LAST_NAME_LENGTH, { message: args.maxLength })
    .regex(LAST_NAME_REGEX, { message: args.allowedSymbols })

export const dateOfBirthScheme = (errorMessage: string) => {
  return z.date({ message: errorMessage })
}

export const aboutMeValidate = (args: LocaleValidationAboutMe) => {
  return z
    .string()
    .regex(ABOUT_ME_REGEX, { message: args.allowedSymbols })
    .max(MAX_ABOUT_ME_LENGTH, { message: args.maxLength })
    .min(MIN_FIRST_NAME_LENGTH, { message: args.minLength })
}
