import { LocaleValidationPassword, LocaleValidationUserName } from '@/locales/en'
import {
  AT_LEAST_ONE_LETTER_REGEX,
  AT_LEAST_ONE_NUMBER_REGEX,
  AT_LEAST_ONE_SPEC_SYMBOL_REGEX,
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
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
    .refine(value => AT_LEAST_ONE_LETTER_REGEX.test(value), { message: args.mustContainLetter })
    .refine(value => AT_LEAST_ONE_NUMBER_REGEX.test(value), { message: args.mustContainNumber })
    .refine(value => AT_LEAST_ONE_SPEC_SYMBOL_REGEX.test(value), {
      message: args.mustContainSpecSymbols,
    })

export const confirmPasswordScheme = z.string().trim()
