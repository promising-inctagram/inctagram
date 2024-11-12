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
  const isAuth = !isError && !isLoading && data !== undefined

  useEffect(() => {
    if (isLoading) {
      return
    } // Пока данные загружаются, ничего не делаем

    const token = localStorage.getItem(ACCESS_TOKEN)
    const hasRedirected = localStorage.getItem('hasRedirected')
    const isLoggedIn = isAuth && data && token
    const currentPath = router.pathname

    // Если есть токен, но пользователь не авторизован, запрашиваем данные пользователя
    if (token && !isAuth) {
      return
    }

    // Если пользователь не авторизован и не на странице логина, редирект на логин
    if (!isLoggedIn && currentPath !== Paths.logIn) {
      router.push(Paths.logIn)

      return
    }

    // Если авторизован и нет флага редиректа, направляем на профиль и устанавливаем флаг
    if (isLoggedIn && !hasRedirected && currentPath !== `${Paths.profile}/${data?.id}`) {
      localStorage.setItem('hasRedirected', 'true')
      router.push(`${Paths.profile}/${data.id}`)

      return
    }

    // Если пользователь выходит из аккаунта, очищаем флаг и редиректим на логин
    if (!token) {
      localStorage.removeItem('hasRedirected')
      if (currentPath !== Paths.logIn) {
        router.push(Paths.logIn)
      }
    }
  }, [isAuth, isLoading, data, router])

  return (
    <AuthContext.Provider value={{ isAuth, meData: data ?? null }}>{children}</AuthContext.Provider>
  )
}
