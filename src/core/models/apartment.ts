import { PagingProps } from './interface';

export type Apartment = {
    id: string;
    areaId: string;
    name: string;
    code: string;
    address: string;
    createdAt: string;
    updatedAt: string | null;
    status: string;
};
export interface CreateApartmentForm extends Apartment {}
export interface UpdateApartmentForm extends Apartment {}
export interface ApartmentFilter extends PagingProps, Pick<Apartment, 'address' | 'name'> {}
