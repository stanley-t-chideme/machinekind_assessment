import { combineReducers, configureStore } from '@reduxjs/toolkit'
import VehicleReducer from './vehicle/slice'
import AuthReducer from './auth/slice'

export const store = configureStore({
  reducer: {
    vehicle: VehicleReducer,
    auth: AuthReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch