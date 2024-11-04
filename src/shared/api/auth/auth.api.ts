import { inctagramApi } from '@/shared/api/inctagram.api'

import {
  CheckRecoveryCodeArgs,
  ConfirmEmailArgs,
  CreateNewPasswordArgs,
  CreateUserArgs,
  ResendRegistrationArgs,
  ResponseMe,
  ResponseWithAccessToken,
  sendPasswordRecoveryEmailArgs,
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
      createNewPassword: builder.mutation<void, CreateNewPasswordArgs>({
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
      login: builder.mutation<ResponseWithAccessToken, LoginArgs>({
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
      me: builder.query<ResponseMe, void>({
        providesTags: ['Me'],
        query: () => ({
          method: 'GET',
          url: '/v1/auth/me',
        }),
      }),
      resendRegistrationEmail: builder.mutation<void, ResendRegistrationArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration-email-resending',
        }),
      }),
      sendPasswordRecoveryEmail: builder.mutation<void, sendPasswordRecoveryEmailArgs>({
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
  useMeQuery,
  useResendRegistrationEmailMutation,
  useSendPasswordRecoveryEmailMutation,
} = authApi
