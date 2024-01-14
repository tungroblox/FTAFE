import { BaseModel } from './interface';

export interface Wallet extends BaseModel {
    id: string;
    balance: number;
}

export const walletDefaultValues: Wallet = {
    id: '',
    balance: 0,
    createdAt: '',
    updatedAt: '',
    isDeleted: false,
};
