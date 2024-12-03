import { inctagramApi } from '@/shared/api/inctagram.api'
import settings from '@/views/settings/model/settings-slice'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(inctagramApi.middleware),
    reducer: combineSlices({
      [inctagramApi.reducerPath]: inctagramApi.reducer,
      settings,
    }),
  })

export type AppStore = ReturnType<typeof makeStore>
export const wrapper = createWrapper<AppStore>(makeStore)
