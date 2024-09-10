import type { PageData } from '@/interface';

import { request } from './request';
import { Currency } from '@/interface/currency';



export const searchCurrency = (params: any) => request<PageData<Currency>>('post', '/currency/search', params);

export const createCurrency = (params: Currency) => request<{ errorCode: any; errorDesc: any }>('post', '/currency/create', params);

export const updateCurrency = (params: Currency) => request<{ errorCode: any; errorDesc: any }>('post', '/currency/update', params);
