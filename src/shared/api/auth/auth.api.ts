import { inctagramApi } from '@/shared/api/inctagram.api'

import {
  ConfirmEmailArgs,
  CreateUserArgs,
  ResendRegistrationArgs,
  SentEmailArgs,
  createNewPasswordArgs,
} from './auth.types'

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration-confirmation',
        }),
      }),
      createNewPassword: builder.mutation<void, createNewPasswordArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/new-password',
        }),
      }),
      createUser: builder.mutation<void, CreateUserArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration',
        }),
      }),
      resendRegistrationEmail: builder.mutation<void, ResendRegistrationArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration-email-resending',
        }),
      }),
      sentEmail: builder.mutation<void, SentEmailArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/password-recovery',
        }),
      }),
    }
  },
})

export const {
  useConfirmEmailMutation,
  useCreateNewPasswordMutation,
  useCreateUserMutation,
  useResendRegistrationEmailMutation,
  useSentEmailMutation,
} = authApi
