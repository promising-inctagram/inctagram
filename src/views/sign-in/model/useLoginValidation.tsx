import { useForm } from 'react-hook-form'

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, PASSWORD_REGEX } from '@/shared/constants'
import { useTranslation } from '@/shared/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useLoginValidation = () => {
  const { locale, t } = useTranslation()
  const { email, password, requiredField } = t.validation

  const emailValidation = z.string().min(1, requiredField).trim().email(email)

  const passwordValidation = z
    .string()
    .min(1, requiredField)
    .min(MIN_PASSWORD_LENGTH, password.minLength)
    .max(MAX_PASSWORD_LENGTH, password.maxLength)
    .regex(PASSWORD_REGEX, password.mustContain)

  const loginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
  })

  const defaultValues = {
    email: '',
    password: '',
  }

  type LoginData = z.infer<typeof loginSchema>
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginData>({
    defaultValues,
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  return {
    control,
    errors,
    handleSubmit,
    isValid,
    t,
  }
}
