import type { PageData } from '@/interface';

import { request } from './request';
import { Booking } from '@/interface/booking';


export const searchBooking = (params: any) => request<PageData<Booking>>('post', '/booking/search', params);
