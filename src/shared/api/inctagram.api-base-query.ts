import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { ACCESS_TOKEN, INCTAGRAM_BASE_URL } from '@/shared/constants'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: INCTAGRAM_BASE_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem(ACCESS_TOKEN)

    headers.set('Authorization', `Bearer ${token}`)

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            method: 'POST',
            url: 'v1/auth/refresh-token',
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const data = refreshResult.data as { accessToken: string }

          localStorage.setItem(ACCESS_TOKEN, data.accessToken)

          result = await baseQuery(args, api, extraOptions)
        } else {
          const accessToken = localStorage.getItem(ACCESS_TOKEN)

          accessToken &&
            (await baseQuery(
              {
                method: 'POST',
                url: '/auth/logout',
              },
              api,
              extraOptions
            ))
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
