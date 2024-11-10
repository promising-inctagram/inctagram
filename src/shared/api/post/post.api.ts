import { inctagramApi } from '@/shared/api/inctagram.api'

import { createPostArgs } from './post.types'

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<any, any>({
        query: args => ({
          body: { ...args },
          method: 'POST',
          url: '/v1/posts',
        }),
      }),
    }
  },
})

export const { useCreatePostMutation } = authApi
