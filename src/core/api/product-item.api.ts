import _get from 'lodash.get';

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
    deleteProductItem: async (productId: string) => {
        const res = await http.delete(`/product-item/${productId}`);
        return res;
    },
};
