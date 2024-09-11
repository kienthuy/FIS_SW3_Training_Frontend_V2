import type { PageData } from '@/interface';

import { request } from './request';
import { Product } from '@/interface/product';





export const searchProduct = (params: any) => request<PageData<Product>>('post', '/product/search', params);

export const createProduct = (params: Product) => request<{ errorCode: any; errorDesc: any }>('post', '/product/create', params);

export const updateProduct = (params: Product) => request<{ errorCode: any; errorDesc: any }>('post', '/product/update', params);
