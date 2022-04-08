import { IUser } from "../auth/types";

export interface IVehicle {
  id: number | string;
  year: number;
  make: string;
  model: string;
  engine: string;
}

export interface VehicleState{
  vehicles: {
    owner: IUser;
    list: IVehicle[]
  }[];
}