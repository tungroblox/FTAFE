import { useTableUtil } from '@context/tableUtilContext';
import { FarmHubAPI } from '@core/api/farmhub';
import { MenuAPI } from '@core/api/menu.api';
import { CreateFarmHubForm, UpdateFarmHubForm } from '@models/farmhub';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useUpdateFarmHubMutation = (id: string) => {
    const { mutate, mutateAsync, ...rest } = useMutation(async (data: UpdateFarmHubForm) => {
        const res = FarmHubAPI.updateFarmHub(id, data);
        return res;
    });
    return {
        mutationUpdateFarmHub: mutate,
        mutationUpdateFarmHubAsync: mutateAsync,
        ...rest,
    };
};

export const useDeleteFarmHubMutation = () => {
    const { mutate, mutateAsync, ...rest } = useMutation(async (id: string) => {
        const res = FarmHubAPI.deleteFarmHub(id);
        return res;
    });
    return {
        mutationDeleteFarmHub: mutate,
        mutationDeleteFarmHubAsync: mutateAsync,
        ...rest,
    };
};

export const useCreateFarmHubMutation = () => {
    const { mutate, mutateAsync, ...rest } = useMutation(async (data: CreateFarmHubForm) => {
        const res = FarmHubAPI.createFarmHub(data);
        return res;
    });
    return {
        mutationCreateFarmHub: mutate,
        mutationCreateFarmHubAsync: mutateAsync,
        ...rest,
    };
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
