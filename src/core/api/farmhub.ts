import _get from 'lodash.get';

import { http } from './http';

export const FarmHubAPI = {
    getFarmHubs: async () => {
        const res = await http.get('/FarmHubs');
        return _get(res, 'data');
    },
    getFarmHubById: async (id: string) => {
        const res = await http.get(`/FarmHubs/farmHubId`, {
            params: {
                farmHubId: id,
            },
        });
        console.log('----------------------------------------------------------------');
        console.log(res);
        return _get(res, 'data');
    },
};
