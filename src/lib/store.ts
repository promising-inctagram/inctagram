import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authReducers } from '@/shared/api/auth/model/auth-slice'
import { inctagramApi } from '@/shared/api/inctagram.api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(inctagramApi.middleware)
  },
  reducer: {
    auth: authReducers,
    [inctagramApi.reducerPath]: inctagramApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
