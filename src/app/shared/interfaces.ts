export interface IUser {
  email: string,
  password: string,
  returnSecureToken: boolean
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

export interface IProduct {
  type: string,
  title: string,
  photo: string[],
  info: string,
  price: string,
}

