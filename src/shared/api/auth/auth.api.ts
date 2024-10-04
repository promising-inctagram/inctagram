import { inctagramApi } from '@/shared/api/inctagram.api'

import { CreateUserArgs } from './auth.types'

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createUser: builder.mutation<void, CreateUserArgs>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/auth/registration',
        }),
      }),
    }
  },
})

export const { useCreateUserMutation } = authApi
