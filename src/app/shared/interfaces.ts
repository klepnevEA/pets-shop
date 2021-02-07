export interface IUser {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface IEnvironment {
    production: boolean;
    apiKey: string;
    fbDb: string;
}

export interface IAuthResponse {
  displayName: string,
  email: string,
  expiresIn: string,
  idToken: string,
  kind: string,
  localId: string,
  refreshToken: string,
  registered: boolean
}

export interface Ipet {
  id?: string,
  type: string,
  title: string,
  photo: string,
  info: string,
  price: string,
  date: Date
}

