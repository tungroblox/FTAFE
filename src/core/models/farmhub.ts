import { FarmHub } from './user';

export type UpdateFarmHubForm = Omit<FarmHub, 'id' | 'createdAt'>;
