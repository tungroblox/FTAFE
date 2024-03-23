import { BaseModel, IOption } from './interface';
import { Wallet } from './wallet';

export enum UserRole {
    ADMIN = 'Admin',
    GUESS = 'Guess',
    COLLECTED_STAFF = 'Collected_staff',
    CUSTOMER = 'Customer',
    DELIVERED_STAFF = 'Delivered_staff',
    FARM_HUB = 'FarmHub',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface User extends BaseModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar: string | null;
    code: string | null;
    address: string | null;
    createdAt: string;
    updatedAt: string | null;
    roleName: UserRole;
    // wallet: {
    //     id: '5d76359b-9cd8-40d5-88e0-5f3498d49718';
    //     accountId: '4a846001-c2c0-4eba-8fcf-f36a8106813f';
    //     balance: 0.0;
    //     createdAt: '2024-03-07T18:22:41.6895101';
    //     updatedAt: null;
    //     status: 'Active';
    //     account: null;
    //     payments: [];
    //     transactions: [];
    // };
    farmHub: FarmHub | null;
}

export const userDefaultValues: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    avatar: null,
    code: null,
    address: null,
    createdAt: '',
    updatedAt: '',
    isDeleted: false,
    roleName: UserRole.GUESS,
    farmHub: null,
};

export interface UserItem extends User {
    wallet: Wallet | null;
}

export const userItemDefaultValues: UserItem = {
    ...userDefaultValues,
    wallet: null,
};

export const optionsUserStatus: IOption[] = [
    {
        value: UserStatus.ACTIVE,
        label: 'ACTIVE',
        origin: UserStatus.ACTIVE,
    },
    {
        value: UserStatus.INACTIVE,
        label: 'INACTIVE',
        origin: UserStatus.INACTIVE,
    },
];

export const colorsUserStatus: IOption[] = [
    { value: UserStatus.ACTIVE, label: 'ACTIVE', origin: 'green' },
    { value: UserStatus.INACTIVE, label: 'INACTIVE', origin: 'red' },
];

export const colorsUserRole: IOption[] = [{ value: UserRole.ADMIN, label: 'ADMIN', origin: 'green' }];

export interface FarmHub {
    id: string;
    name: string;
    code: string;
    description: string;
    image: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    roleName: UserRole.FARM_HUB;
}
