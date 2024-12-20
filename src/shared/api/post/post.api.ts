import { inctagramApi } from '@/shared/api/inctagram.api'

import { CreatePostResponse, GetPostsArgs, ResponseGetPosts, UpdatePostArgs } from './post.types'

export const postApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<CreatePostResponse, FormData>({
        invalidatesTags: ['Posts'],
        query: (formData: FormData) => ({
          body: formData,
          method: 'POST',
          url: '/v1/posts',
        }),
      }),
      getPosts: builder.query<ResponseGetPosts, GetPostsArgs>({
        providesTags: ['Posts'],
        query: ({ cursor, id, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/posts/user/${id}`,
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

export const { useCreatePostMutation, useGetPostsQuery, useUpdatePostMutation } = postApi
