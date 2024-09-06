import type { LoginParams, LoginResult, LogoutParams, LogoutResult } from '../interface/user/login';

import { request } from './request';

/** Dang nhap */
export const apiLogin = (data: LoginParams) => request<LoginResult>('post', '/auth/login', data);

/** Dang xuat */
export const apiLogout = (data: LogoutParams) => request<LogoutResult>('post', '/user/logout', data);
