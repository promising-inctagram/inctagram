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
  const isAuth = !isError && !isLoading && !!data

  const token = typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN) : null

  useEffect(() => {
    if (isLoading) {
      return
    }

    const hasRedirected = localStorage.getItem('hasRedirected')
    const currentPath = router.pathname

    // Первый login в приложение
    if (isAuth && token && !hasRedirected && currentPath !== `${Paths.profile}/${data?.id}`) {
      localStorage.setItem('hasRedirected', 'true')
      router.push(`${Paths.profile}/${data.id}`)
    }

    // Если пользователь не авторизован и не на странице логина, редирект на логин
    if (!isAuth && !token && currentPath !== Paths.logIn) {
      localStorage.removeItem('hasRedirected')
      router.push(Paths.logIn)
    }
  }, [isAuth, isLoading, data, router, token])

  // Логика на logout
  useEffect(() => {
    if (!isAuth && !token) {
      localStorage.removeItem('hasRedirected')
      if (router.pathname !== Paths.logIn) {
        router.push(Paths.logIn)
      }
    }
  }, [isAuth, token, router])

  return (
    <AuthContext.Provider value={{ isAuth, meData: data ?? null }}>{children}</AuthContext.Provider>
  )
}
