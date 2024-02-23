import { FarmHub } from './user';

export interface Product extends FarmHub {
    code: string;
    name: string;
    description: string;
    label: string;
    p_image: String[];
    special_tag: string;
    status: string;
    farm_hub: FarmHub;
}
