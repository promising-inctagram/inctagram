import { inctagramApi } from '@/shared/api/inctagram.api'

import {
  CheckRecoveryCodeArgs,
  ConfirmEmailArgs,
  CreateUserArgs,
  LoginData,
  ResendRegistrationArgs,
  ResponseLogin,
  SentEmailArgs,
  createNewPasswordArgs,
} from './auth.types'

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      checkRecoveryCode: builder.mutation<void, CheckRecoveryCodeArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/check-recovery-code',
        }),
      }),
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
      login: builder.mutation<ResponseLogin, LoginData>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
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
  useCheckRecoveryCodeMutation,
  useConfirmEmailMutation,
  useCreateNewPasswordMutation,
  useCreateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useResendRegistrationEmailMutation,
  useSentEmailMutation,
} = authApi
