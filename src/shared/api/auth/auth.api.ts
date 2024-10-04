import { inctagramApi } from '@/shared/api/inctagram-api'

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createUser: builder.mutation({
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
