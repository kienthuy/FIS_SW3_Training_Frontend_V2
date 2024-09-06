import type { PageData } from '@/interface';

import { request } from './request';
import { Limit } from '@/interface/limit';

export const searchLimit = (params: any) => request<PageData<Limit>>('post', '/limit/search', params);
