import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../auth/types'
import type { RootState } from '../index'
import type {IVehicle, VehicleState} from './types'

const initialState: VehicleState = {
  vehicles: []
}

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<{ owner: IUser, vehicle: IVehicle }>) => {
      const { owner, vehicle } = action.payload
      state.vehicles = [
        ...state.vehicles.filter(item => item.owner.email !== owner.email),
        {
          owner: owner,
          list: [...state.vehicles.filter(item => {
            return item.owner.email === owner.email
          })[0] !== undefined ? 
            [
            ...state.vehicles.filter(item => {
            return item.owner.email === owner.email
            })[0].list,
              vehicle
            ] : [
            vehicle
          ]
        ],
        }
      ]
    },
    updateVehicle: (state, action: PayloadAction<{ owner: IUser, vehicle: IVehicle }>) => {
      const { owner, vehicle } = action.payload
      state.vehicles = [
        ...state.vehicles.filter(item => item.owner.email !== owner.email),
        {
          owner: owner,
          list: [...state.vehicles.filter(item => {
            return item.owner.email === owner.email
          })[0] !== undefined ? 
            [
            ...state.vehicles.filter(item => {
            return item.owner.email === owner.email
            })[0].list.filter(item => item.id !== vehicle.id),
              vehicle
          ]: []
        ],
        }
      ]
    },
    removeVehicle: (state, action: PayloadAction<{ owner: IUser , id: number | string }>) => {
     const { owner, id } = action.payload
      state.vehicles = [
        ...state.vehicles.filter(item => item.owner.email !== owner.email),
        {
          owner: owner,
          list: [...state.vehicles.filter(item => {
            return item.owner.email === owner.email
          })[0] !== undefined ? 
            [
            ...state.vehicles.filter(item => {
            return item.owner.email === owner.email
            })[0].list.filter(item => item.id !== id),
          ]: []
        ],
        }
      ]
    },

  }
})

export const { addVehicle, removeVehicle, updateVehicle } = vehicleSlice.actions

export const getVehicles = (state: RootState, user: IUser | null): IVehicle[] => {
  if (user === null)
    return []
  const vehicleList = state.vehicle.vehicles.filter(item => item.owner.email === user.email)[0]?.list
  return vehicleList !== undefined? vehicleList : []
};

export const getVehicleById = (state: RootState, id: string | number, user: IUser | null): IVehicle | undefined => {
  if (user === null)
    return undefined
  return state.vehicle.vehicles
    .filter(item => item.owner.email === user.email)[0].list
    .filter(item => item.id === id)[0]
}

export default vehicleSlice.reducer