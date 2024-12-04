import { inctagramApi } from '@/shared/api/inctagram.api'

import { createPostArgs, updatePostArgs } from './post.types'

export const authApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<any, any>({
        query: (formData: FormData) => ({
          body: formData,
          method: 'POST',
          url: '/v1/posts',
        }),
      }),
      updatePost: builder.mutation<void, updatePostArgs>({
        query: ({ ...args }) => ({
          body: {
            description: args.description,
          },
          method: 'PUT',
          url: `/v1/posts/${args.id}`,
        }),
      }),
    }
  },
})

export const { useCreatePostMutation, useUpdatePostMutation } = authApi
