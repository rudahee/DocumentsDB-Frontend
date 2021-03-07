export interface IUser {
  id?: number;
  name: string;
  surname: string;
  age: number;
  username: string;
  password: string;
  email: string;
}

export interface LoginData {
  username: string;
  password: string;
}
