import type { PageData } from '@/interface';

import { request } from './request';
import { Position } from '@/interface/position';





export const searchPosition = (params: any) => request<PageData<Position>>('post', '/position/search', params);

export const createPosition = (params: Position) => request<{ errorCode: any; errorDesc: any }>('post', '/position/create', params);

export const updatePosition = (params: Position) => request<{ errorCode: any; errorDesc: any }>('post', '/position/update', params);
