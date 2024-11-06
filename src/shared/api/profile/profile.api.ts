import { inctagramApi } from '@/shared/api/inctagram.api'
import { AvatarDto } from '@/shared/api/profile/profile.types'

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      query: () => ({
        method: 'DELETE',
        url: 'v1/profile/avatar',
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
export const { useDeleteAvatarMutation, useUploadAvatarMutation } = profileApi
