import { inctagramApi } from '@/shared/api/inctagram.api'
import { AvatarDto, City, Country, UpdateProfileArgs } from '@/shared/api/profile/profile.types'

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    cities: builder.query<City[], { id: number | string }>({
      query: arg => ({
        method: 'GET',
        url: `/v1/reference/countries/${arg.id}/cities`,
      }),
    }),
    countries: builder.query<Country[], void>({
      query: () => ({
        method: 'GET',
        url: '/v1/reference/countries',
      }),
    }),
    deleteAvatar: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: '/profile/avatar',
      }),
    }),
    getUserPosts: builder.query<any, string>({
      query: userId => ({
        method: 'GET',
        url: '/v1/posts/user/' + userId,
      }),
    }),
    updateProfile: builder.mutation<void, UpdateProfileArgs>({
      invalidatesTags: ['Profile'],
      query: args => ({
        body: args,
        method: 'PUT',
        url: '/v1/profile/my',
      }),
    }),
    uploadAvatar: builder.mutation<void, AvatarDto>({
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: '/profile/avatar',
        }
      },
    }),
  }),
})
export const {
  useCountriesQuery,
  useDeleteAvatarMutation,
  useGetUserPostsQuery,
  useLazyCitiesQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileApi
