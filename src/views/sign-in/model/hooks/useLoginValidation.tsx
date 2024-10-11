import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks'
import { signInSchemeCreator } from '@/views/sign-in/model/sign-in-scheme-creator'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useLoginValidation = () => {
  const { t } = useTranslation()

  type SignInFields = z.infer<ReturnType<typeof signInSchemeCreator>>
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<SignInFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchemeCreator(t.validation)),
  })

  return {
    control,
    errors,
    handleSubmit,
    isValid,
    setError,
  }
}
