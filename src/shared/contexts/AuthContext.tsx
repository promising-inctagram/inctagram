import { ReactNode, createContext, useEffect } from 'react'

import { useMeQuery } from '@/shared/api/auth/auth.api'
import { ResponseMe } from '@/shared/api/auth/auth.types'
import { ACCESS_TOKEN } from '@/shared/constants'
import { Paths } from '@/shared/enums'
import { Nullable } from '@/shared/types'
import { useRouter } from 'next/router'

type AuthContextType = {
  isAuth: boolean
  meData: Nullable<ResponseMe>
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  meData: null,
})

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const { data, isError, isLoading } = useMeQuery()

  const token = typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN) : null
  const hasRedirected = typeof window !== 'undefined' ? localStorage.getItem('hasRedirected') : null
  const isAuth = !isError && !isLoading && !!token

  // Первый login в приложение
  useEffect(() => {
    if (isAuth && !hasRedirected) {
      localStorage.setItem('hasRedirected', 'true')
      router.push(`${Paths.profile}/${data?.id}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, hasRedirected])

  return (
    <AuthContext.Provider value={{ isAuth, meData: data ?? null }}>{children}</AuthContext.Provider>
  )
}
