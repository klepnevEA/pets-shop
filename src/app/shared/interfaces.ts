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
