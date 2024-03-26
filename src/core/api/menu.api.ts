import _get from 'lodash.get';

import { http } from '.';

export const MenuAPI = {
    getAllMenus: async () => {
        const res = await http.get('menus');
        return _get(res, 'data');
    },
    getByFarmHubId: async (farmHubId: string) => {
        const res = await http.get(`farm-hub/${farmHubId}/menus`);
        return _get(res, 'data');
    },
    getById: async (id: string) => {
        const res = await http.get(`menu/${id}`);
        return _get(res, 'data');
    },
    updateOne: () => {},
    deleteOne: () => {},
};
