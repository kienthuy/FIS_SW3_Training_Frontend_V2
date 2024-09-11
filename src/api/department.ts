import type { PageData } from '@/interface';

import { request } from './request';
import { Department } from '@/interface/department';




export const searchDepartment = (params: any) => request<PageData<Department>>('post', '/department/search', params);

export const createDepartment = (params: Department) => request<{ errorCode: any; errorDesc: any }>('post', '/department/create', params);

export const updateDepartment = (params: Department) => request<{ errorCode: any; errorDesc: any }>('post', '/department/update', params);
