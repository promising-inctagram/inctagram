import { inctagramApi } from '@/shared/api/inctagram.api'
import { AvatarDto, UpdateProfileArgs } from '@/shared/api/profile/profile.types'

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: '/profile/avatar',
      }),
    }),
    updateProfile: builder.mutation<void, UpdateProfileArgs>({
      invalidatesTags: ['Profile'],
      query: args => ({
        body: { ...args },
        method: 'PUT',
        url: '/profile/my',
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
export const { useDeleteAvatarMutation, useUpdateProfileMutation, useUploadAvatarMutation } =
  profileApi
