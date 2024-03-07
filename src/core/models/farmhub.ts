import { FarmHub } from './user';

export type UpdateFarmHubForm = Omit<FarmHub, 'id' | 'createdAt'>;
export type CreateFarmHubForm = Pick<FarmHub, 'name' | 'code' | 'description' | 'image' | 'address'>;
