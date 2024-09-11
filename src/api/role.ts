import type { PageData } from '@/interface';

import { request } from './request';
import { Role } from '@/interface/role';




export const searchRole = (params: any) => request<PageData<Role>>('post', '/role/search', params);

export const createRole = (params: Role) => request<{ errorCode: any; errorDesc: any }>('post', '/role/create', params);

export const updateRole = (params: Role) => request<{ errorCode: any; errorDesc: any }>('post', '/role/update', params);
