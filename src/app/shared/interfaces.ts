export interface IAdmin {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IEnvironment {
  production: boolean;
  apiKey: string;
  fbDb: string;
}

export interface IAuthResponse {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

export interface IPet {
  id?: string;
  type: string;
  title: string;
  photo: string;
  info: string;
  price: string;
  date: Date;
}
export interface IUser {
  name: string;
  phone: string;
  addres: string;
  payment: string;
  date: Date;
}

export interface IOrder {
  name: string;
    phone: string;
    addres: string;
    payment: string;
    date: Date;
    order: Object
}
