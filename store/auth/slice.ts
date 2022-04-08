import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { getData, storeData } from '../storage-utils'
import { AuthState, IUser } from './types'

const usersList: IUser[] = [
  {
    firstName: "Stanley",
    lastName: "Chideme",
    email: 's@gmail.com',
    password: '12345'
  },
  {
    firstName: "MachineKind",
    lastName: "Admin",
    email: 'admin@machinekind.com',
    password: '12345'
  },
]

export const initialiseUser = createAsyncThunk(
  'auth/initialiseUser',
  async () => {
    const user = await getData({
      key: "user",
      isObject: true,
    })

    return user
  }

)

const initialState: AuthState = {
  current: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ email: string; password: string; }>) => {
      const { email, password } = action.payload
      if (usersList.filter(item => email.toLowerCase().trim() === item.email.toLowerCase() && password === item.password).length > 0) {        
        state.current = {
          ...usersList.filter(item => email.toLowerCase().trim() === item.email.toLowerCase() && password === item.password)[0]
        }
        storeData({key: "user", value: state.current})
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialiseUser.fulfilled, (state, action) => {
      const { payload } = action
      if (payload === null) {
        state.current = null
      }
      else {
        const usr: IUser = JSON.parse(payload)
        state.current = usr
      }
    })
  }
})

export const { signIn } = AuthSlice.actions

export const getCurrentUser = (state: RootState) => {
  const user = state.auth.current
  return user
}

export default AuthSlice.reducer