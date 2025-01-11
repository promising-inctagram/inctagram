import { inctagramApi } from '@/shared/api/inctagram.api'

import {
  CreatePostResponse,
  GetPostsArgs,
  Post,
  ResponseGetPosts,
  UpdatePostArgs,
} from './post.types'

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
      deletePost: builder.mutation<void, number>({
        invalidatesTags: ['Posts'],
        query: id => ({
          method: 'DELETE',
          url: `/v1/posts/${id}`,
        }),
      }),
      getOnePost: builder.query<Post, number>({
        providesTags: ['Posts'],
        query: id => ({
          method: 'GET',
          url: `v1/posts/${id}`,
        }),
      }),
      getPosts: builder.query<ResponseGetPosts, GetPostsArgs>({
        providesTags: ['Posts'],
        query: ({ id, ...args }) => ({
          method: 'GET',
          params: args ?? undefined,
          url: `v1/posts/user/${id}`,
        }),
      }),
      updatePost: builder.mutation<CreatePostResponse, UpdatePostArgs>({
        invalidatesTags: ['Posts'],
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

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetOnePostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
} = postApi
