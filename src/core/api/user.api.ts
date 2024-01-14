import { CVItem } from '@models/cv';
import { PagingProps, ResponseList } from '@models/interface';
import { Transaction } from '@models/transaction';
import { User, UserItem } from '@models/user';
import _get from 'lodash.get';

import { http } from '.';

// export interface IV1UserUpdateMe extends Pick<User> {}
export interface IV1UserUpdateMePassword {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface IV1UserUpdateMeAvatar extends Pick<User, 'avatar'> {}

export interface IV1UserCreateStaff extends Pick<User, 'fullName' | 'email'> {
    password: string;
}

export interface IV1UserCreateExpert extends Pick<User, 'fullName' | 'email'> {
    password: string;
}

export interface IV1UserUpdateStaff extends Pick<User, 'fullName' | 'email'> {}

export interface IV1UserTransactionFilter extends PagingProps {}

export interface IV1UserUpdate extends Pick<User, 'avatar' | 'phone' | 'fullName' | 'id'> {}

export const userApi = {
    v1GetMe: async () => {
        const res = await http.get<UserItem>('/user/me');
        return _get(res, 'data');
    },
    v1GetCVS: async () => {
        const res = await http.get<ResponseList<CVItem>>('/user/cvs');
        return _get(res, 'data');
    },
    v1PutAvatar: async (dto: IV1UserUpdateMeAvatar) => {
        const res = await http.put<UserItem>('/user/avatar', dto);
        return _get(res, 'data');
    },
    v1CreateStaff: async (dto: IV1UserCreateStaff) => {
        const res = await http.post<UserItem>('/user/staff', dto);
        return _get(res, 'data');
    },
    v1CreateExpert: async (dto: IV1UserCreateExpert) => {
        const res = await http.post<UserItem>('/user/expert', dto);
        return _get(res, 'data');
    },
    v1UserGetTransactions: async (filter: Partial<IV1UserTransactionFilter>) => {
        const res = await http.get<ResponseList<Transaction>>('/user/transactions', { params: { ...filter } });
        return _get(res, 'data');
    },

    v1UpdateUserProfile: async (dto: IV1UserUpdate) => {
        const { id, ...rest } = dto;
        const res = await http.put<UserItem>(`/user/${id}`, rest);
        return _get(res, 'data');
    },
};
