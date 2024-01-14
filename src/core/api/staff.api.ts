import { ExpertItem } from '@models/expert';
import { PagingProps, ResponseList } from '@models/interface';
import { User, UserItem } from '@models/user';
import _get from 'lodash.get';

import { http } from './http';

export interface IV1GetFilterStaff extends Pick<User, 'email' | 'phone'>, PagingProps {
    name: string;
}

export const staffApi = {
    v1Get: async (id: string) => {
        const res = await http.get(`/staff/${id}`);
        return _get(res, 'data') as UserItem;
    },

    v1GetFilter: async (filter: Partial<IV1GetFilterStaff>) => {
        const res = await http.get('/staff', { params: { ...filter } });
        return _get(res, 'data') as ResponseList<UserItem>;
    },
};
