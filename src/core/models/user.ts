import { Candidate } from './candidate';
import { ExpertItem } from './expert';
import { BaseModel, IOption } from './interface';
import { Wallet } from './wallet';

export enum UserRole {
    ADMIN = 'Admin',
    GUESS = 'Guess',
    COLLECTED_STAFF = 'Collected_staff',
    CUSTOMER = 'Customer',
    DELIVERED_STAFF = 'Delivered_staff',
    FARM_HUB = 'Farm_Hub',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface User extends BaseModel {
    id: string;
    type: UserRole;
    avatar: string;
    email: string;
    fullName: string;
    phone: string;
    status: string;
    //! UNLOCK sau
    // first_name: string;
    // last_name: string;
    address: string;
    job_title: string;
    password: string;
    username: string;
    gender: string;
}

export const userDefaultValues: User = {
    id: '',
    type: UserRole.GUESS,
    avatar: '',
    email: '',
    fullName: '',
    phone: '',
    status: '',
    createdAt: '',
    updatedAt: '',
    isDeleted: false,
    address: '',
    gender: 'male',
    username: '',
    password: '',
    job_title: '',
};

export interface UserItem extends User {
    expert: ExpertItem | null;
    candidate: Candidate | null;
    wallet: Wallet | null;
}

export const userItemDefaultValues: UserItem = {
    ...userDefaultValues,
    expert: null,
    candidate: null,
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
    status: SVGStringList;
}
