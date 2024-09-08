import type { PageData } from '@/interface';

import { request } from './request';
import { Menu } from '@/interface/menu';

export const searchMenu = (params: any) => request<PageData<Menu>>('post', '/menu/search', params);

export const createMenu = (params: Menu) => request<{ errorCode: any; errorDesc: any }>('post', '/menu/create', params);

export const updateMenu = (params: Menu) => request<{ errorCode: any; errorDesc: any }>('post', '/menu/update', params);
