import { UpdateFarmHubForm } from '@models/farmhub';
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
        return _get(res, 'data');
    },
    updateFarmHub: async (id: string, data: UpdateFarmHubForm) => {
        const res = await http.put(`/FarmHubs/${id}`, data);
        return _get(res, 'data');
    },
    deleteFarmHub: async (id: string) => {
        const res = await http.delete(`/FarmHubs/${id}`);
        console.log('deleteFarmHub: ~ res:', res);
        return res;
    },
};
