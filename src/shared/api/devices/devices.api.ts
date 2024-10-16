import { getDevicesArgs } from '@/shared/api/devices/devices.types'
import { inctagramApi } from '@/shared/api/inctagram.api'

export const devicesApi = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
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

export const { useGetDevicesQuery } = devicesApi
