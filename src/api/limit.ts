import type { PageData } from '@/interface';

import { request } from './request';
import { Limit } from '@/interface/limit';

export const searchLimit = (params: any) => request<PageData<Limit>>('post', '/limit/search', params);

export const createLimit = (params: Limit) => request<{ errorCode: any; errorDesc: any }>('post', '/limit/create', params);

export const updateLimit = (params: Limit) => request<{ errorCode: any; errorDesc: any }>('post', '/limit/update', params);
