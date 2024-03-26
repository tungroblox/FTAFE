import _get from 'lodash.get';

import { CreateMenu } from '@models/farmhub-menu';
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
    createMenu: async (body: CreateMenu) => {
        const res = await http.post('menu', body);
        return _get(res, 'data');
    },
    deleteMenu: async (id: string) => {
        const res = await http.delete(`menu/${id}`);
        return _get(res, 'data');
    },
    updateMenu: async (id: string, body: CreateMenu) => {
        const res = await http.put(`menu/${id}`, body);
        return _get(res, 'data');
    },
};
