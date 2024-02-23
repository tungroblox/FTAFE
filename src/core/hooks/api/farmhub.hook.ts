import { useTableUtil } from '@context/tableUtilContext';
import { FarmHubAPI } from '@core/api/farmhub';
import { useQuery } from '@tanstack/react-query';

export const useQueryFarmHub = () => {
    const { setTotalItem } = useTableUtil();
    return useQuery({
        queryKey: ['farm-hub'],
        queryFn: async () => {
            const res = await FarmHubAPI.getFarmHubs();
            setTotalItem(res?.payload.length);
            return res;
        },
    });
};
export const useQueryFarmHubById = (id: string) => {
    return useQuery({
        queryKey: ['farm-hub', id],
        queryFn: async () => {
            const res = await FarmHubAPI.getFarmHubById(id);
            console.log('queryFn: ~ res:', res);
            return res;
        },
    });
};
