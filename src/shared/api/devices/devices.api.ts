import { getDevicesArgs } from '@/shared/api/devices/devices.types'
import { inctagramApi } from '@/shared/api/inctagram.api'

export const devicesApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteAllDevices: builder.mutation<void, void>({
        invalidatesTags: ['Devices'],
        query: () => ({
          method: 'DELETE',
          url: '/v1/security/devices',
        }),
      }),
      deleteDevice: builder.mutation<void, string>({
        invalidatesTags: ['Devices'],
        query: deviceId => ({
          method: 'DELETE',
          url: '/v1/security/devices/' + deviceId,
        }),
      }),
      getDevices: builder.query<getDevicesArgs[], void>({
        providesTags: ['Devices'],
        query: () => ({
          method: 'GET',
          url: '/v1/security/devices',
        }),
      }),
    }
  },
})

export const { useDeleteAllDevicesMutation, useDeleteDeviceMutation, useGetDevicesQuery } =
  devicesApi
