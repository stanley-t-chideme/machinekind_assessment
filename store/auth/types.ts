export interface AuthState{
  current: IUser | null;
}

export interface IUser{
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}