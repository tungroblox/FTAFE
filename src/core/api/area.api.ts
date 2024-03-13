import { Area } from '@models/area';
import _get from 'lodash.get';

import { http } from './http';

export const AreaAPI = {
    getAll: async () => {
        const res = await http.get('/areas');
        return _get(res, 'data.payload') as Area[];
    },
};
