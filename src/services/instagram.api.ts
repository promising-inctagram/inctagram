import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const instagramApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.inctagram.world/api/' }),
  endpoints: builder => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: credentials => {
        return {
          body: credentials,
          url: '/v1/auth/login',
        }
      },
    }),
  }),
  reducerPath: 'instagramApi',
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = instagramApi
