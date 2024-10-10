import { inctagramApi } from '@/shared/api/inctagram.api'

import {
  ConfirmEmailArgs,
  CreateUserArgs,
  LoginArgs,
  ResendRegistrationArgs,
  ResponseLogin,
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
      createUser: builder.mutation<void, CreateUserArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration',
        }),
      }),
      login: builder.mutation<ResponseLogin, LoginArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      resendRegistrationEmail: builder.mutation<void, ResendRegistrationArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration-email-resending',
        }),
      }),
    }
  },
})

export const {
  useConfirmEmailMutation,
  useCreateUserMutation,
  useLoginMutation,
  useResendRegistrationEmailMutation,
} = authApi
