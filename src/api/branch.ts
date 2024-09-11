import type { PageData } from '@/interface';

import { request } from './request';
import { Branch } from '@/interface/branch';



export const searchBranch = (params: any) => request<PageData<Branch>>('post', '/branch/search', params);

export const createBranch = (params: Branch) => request<{ errorCode: any; errorDesc: any }>('post', '/branch/create', params);

export const updateBranch = (params: Branch) => request<{ errorCode: any; errorDesc: any }>('post', '/branch/update', params);
