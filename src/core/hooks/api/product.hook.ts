import { productAPI } from '@core/api/product.api';
import { useQuery } from '@tanstack/react-query';

const useQueryProducts = () => {
    return useQuery(['products'], async () => await productAPI.getProducts(), {
        initialData: [],
    });
};

export { useQueryProducts };
