import { Candidate } from './candidate';
import { Expert, ExpertItem } from './expert';
import { BaseModel, IOption } from './interface';
import { Wallet } from './wallet';

export enum UserRole {
    ADMIN = 'Admin',
    EXPERT = 'Expert',
    STAFF = 'Staff',
    CANDIDATE = 'Candidate',
    GUESS = 'Guess',
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

export const optionsUserRole: IOption[] = [
    {
        value: UserRole.ADMIN,
        label: 'ADMIN',
        origin: UserRole.ADMIN,
    },
    {
        value: UserRole.EXPERT,
        label: 'EXPERT',
        origin: UserRole.EXPERT,
    },
    {
        value: UserRole.STAFF,
        label: 'STAFF',
        origin: UserRole.STAFF,
    },
    {
        value: UserRole.CANDIDATE,
        label: 'CANDIDATE',
        origin: UserRole.CANDIDATE,
    },
];

export const colorsUserStatus: IOption[] = [
    { value: UserStatus.ACTIVE, label: 'ACTIVE', origin: 'green' },
    { value: UserStatus.INACTIVE, label: 'INACTIVE', origin: 'red' },
];

export const colorsUserRole: IOption[] = [{ value: UserRole.ADMIN, label: 'ADMIN', origin: 'green' }];
