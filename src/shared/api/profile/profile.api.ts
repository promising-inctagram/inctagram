import { inctagramApi } from '@/shared/api/inctagram.api'
import { User } from '@/shared/api/profile/profile.types'

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getUser: builder.query<User, void>({
        providesTags: ['Me'],
        query: () => ({
          method: 'GET',
          url: '/v1/auth/me',
        }),
      }),
    }
  },
})

export const { useLazyGetUserQuery } = profileApi
