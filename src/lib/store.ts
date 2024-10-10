import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authReducers } from '@/shared/api/auth/model/auth-slice'
import { inctagramApi } from '@/shared/api/inctagram.api'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
    reducer: { auth: authReducers, [inctagramApi.reducerPath]: inctagramApi.reducer },
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
export const wrapper = createWrapper<AppStore>(makeStore)
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
