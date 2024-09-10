import type { PageData } from '@/interface';

import { request } from './request';
import { User } from '@/interface/user';



export const searchUser = (params: any) => request<PageData<User>>('post', '/user/search', params);

export const createUser = (params: User) => request<{ errorCode: any; errorDesc: any }>('post', '/user/create', params);

export const updateUser = (params: User) => request<{ errorCode: any; errorDesc: any }>('post', '/user/update', params);
