/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** Tai khoan */
  code: string;
  /** Mat khau */
  password: string;
}

export interface LoginResult {
  /** auth token */
  data: string;
  errorCode: string;
  errorDesc: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
