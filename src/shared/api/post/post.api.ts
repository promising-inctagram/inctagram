import { inctagramApi } from '@/shared/api/inctagram.api'

import { CreatePostResponse, UpdatePostArgs } from './post.types'

export const postApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<CreatePostResponse, FormData>({
        query: (formData: FormData) => ({
          body: formData,
          method: 'POST',
          url: '/v1/posts',
        }),
      }),
      updatePost: builder.mutation<CreatePostResponse, UpdatePostArgs>({
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

export const { useCreatePostMutation, useUpdatePostMutation } = postApi
