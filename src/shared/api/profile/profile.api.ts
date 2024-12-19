import { inctagramApi } from '@/shared/api/inctagram.api'
import {
  AvatarDto,
  City,
  Country,
  GetUserProfileArgs,
  ResponseGetUserProfile,
  UpdateProfileArgs,
} from '@/shared/api/profile/profile.types'

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
      invalidatesTags: ['Me'],
      query: () => ({
        method: 'DELETE',
        url: 'v1/profile/avatar',
      }),
    }),
    getUserProfile: builder.query<ResponseGetUserProfile, GetUserProfileArgs>({
      providesTags: ['Profile'],
      query: ({ id }) => ({
        method: 'GET',
        url: `v1/profile/${id}`,
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
      invalidatesTags: ['Me'],
      query: ({ file }) => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          body: formData,
          method: 'POST',
          url: 'v1/profile/avatar',
        }
      },
    }),
  }),
})
export const {
  useCountriesQuery,
  useDeleteAvatarMutation,
  useGetUserProfileQuery,
  useLazyCitiesQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} = profileApi
