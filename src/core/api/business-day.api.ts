import { CreateBusinessDay } from '@models/business-day';
import _get from 'lodash.get';

import { http } from './http';
export const BusinessDayAPI = {
    getAll: async () => {
        const res = await http.get('/business-days');
        return _get(res, 'data');
    },
    getById: async (id: string) => {
        const res = await http.get(`business-day/${id}`);
        return _get(res, 'data');
    },
    deleteOne: async (id: string) => {
        const res = await http.delete(`business-day/${id}`);
        return _get(res, 'data');
    },
    createOne: async (body: CreateBusinessDay) => {
        const res = await http.post('business-day', body);
        return _get(res, 'data');
    },
};
