import { baseQueryWithReauth } from '@/shared/api/inctagram.api-base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const inctagramApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: ['Me', 'Devices'],
})
