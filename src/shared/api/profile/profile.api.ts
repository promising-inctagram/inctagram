import { inctagramApi } from '@/shared/api/inctagram.api'

export const devicesApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getUserPosts: builder.query<any, string>({
        query: userId => ({
          method: 'GET',
          url: '/v1/posts/user/' + userId,
        }),
      }),
    }
  },
})

export const { useGetUserPostsQuery } = devicesApi
