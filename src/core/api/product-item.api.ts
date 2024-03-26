import _get from 'lodash.get';

import { CreateProductItem } from '@models/product-item';
import { http } from './http';
export const ProductItemAPI = {
    getAllByProductId: async (productId: string) => {
        const res = await http.get(`/product/${productId}/product-items`);
        return _get(res, 'data');
    },
    getProductItemById: async (productId: string) => {
        const res = await http.get(`/product-item/${productId}`);
        return _get(res, 'data');
    },
    getProductItemByFarmHubIdAndProductId: async (farmHubId: string, productId: string) => {
        const res = await http.get(`/farmhub/${farmHubId}/product/${productId}/product-items`);
        return _get(res, 'data');
    },
    deleteProductItem: async (productId: string) => {
        const res = await http.delete(`/product-item/${productId}`);
        return res;
    },
    createProductItem: async (body: CreateProductItem, id: string) => {
        const res = await http.post(`product/${id}/product-item`, body);
        return _get(res, 'data');
    },
};
