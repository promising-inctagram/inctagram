import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type SavedSettingsForm = {
  aboutMe?: string
  city?: string
  country?: string
  firstName?: string
  lastName?: string
  username?: string
}

export type SettingsState = {
  isReturningFromPolicy: boolean
  savedSettingsForm: SavedSettingsForm
}

const initialState: SettingsState = {
  isReturningFromPolicy: false,
  savedSettingsForm: {},
}

const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    setReturningFromPolicy: (state, action: PayloadAction<boolean>) => {
      state.isReturningFromPolicy = action.payload
    },
    updateFormField: (
      state,
      action: PayloadAction<{ field: keyof SavedSettingsForm; value: any }>
    ) => {
      state.savedSettingsForm[action.payload.field] = action.payload.value
    },
  },
  selectors: {
    selectIsReturningFromPolicy: sliceState => sliceState.isReturningFromPolicy,
    selectSavedSettingsForm: sliceState => sliceState.savedSettingsForm,
  },
})

export const { setReturningFromPolicy, updateFormField } = settingsSlice.actions
export default settingsSlice.reducer
export const { selectIsReturningFromPolicy, selectSavedSettingsForm } = settingsSlice.selectors
