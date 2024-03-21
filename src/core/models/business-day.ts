import { FarmHubMenu } from './farmhub-menu';

export type BusinessDay = {
    id: string;
    name: string;
    regiterDay: Date | string;
    endOfRegister: Date | string;
    openDay: Date | string;
    endOfDay: Date | string;
    createdAt: string;
    updatedAt: string;
    status: string;
    menus: FarmHubMenu[];
};
export interface CreateBusinessDay extends Pick<BusinessDay, 'name' | 'regiterDay' | 'endOfRegister' | 'openDay'> {}
