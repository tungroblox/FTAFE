import { useTableUtil } from '@context/tableUtilContext';
import { FarmHubAPI } from '@core/api/farmhub';
import { MenuAPI } from '@core/api/menu.api';
import { useQuery } from '@tanstack/react-query';

export const useQueryFarmHub = () => {
    const { setTotalItem } = useTableUtil();
    return useQuery({
        queryKey: ['farm-hubs'],
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

            return res;
        },
    });
};
export const useQueryGetFarmHubMenu = (id: string) => {
    return useQuery({
        queryKey: ['farm-hub-menu'],
        queryFn: async () => {
            const res = await MenuAPI.getByFarmHubId(id);
            return res;
        },
    });
};
