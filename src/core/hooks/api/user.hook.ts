import { useTableUtil } from '@context/tableUtilContext';
import { IV1UserCreateExpert, IV1UserCreateStaff, IV1UserTransactionFilter, IV1UserUpdate, IV1UserUpdateMeAvatar, userApi } from '@core/api';
import { useMutation, useQuery } from '@tanstack/react-query';

const useQueryUserGetCVS = () => {
    return useQuery(
        ['CVs'],
        async () => {
            const res = await userApi.v1GetCVS();
            return res.data;
        },
        {
            initialData: [],
        }
    );
};

const useMutationUserUpdateMeAvatar = () => {
    const { mutate, mutateAsync, ...rest } = useMutation(async (dto: IV1UserUpdateMeAvatar) => userApi.v1PutAvatar(dto));

    return {
        mutateUpdateAvatar: mutate,
        mutateUpdateAvatarAsync: mutateAsync,
        ...rest,
    };
};

const useMutationUserCreateStaff = () => {
    const { mutate, mutateAsync, ...rest } = useMutation(async (dto: IV1UserCreateStaff) => userApi.v1CreateStaff(dto));

    return {
        mutateCreateStaff: mutate,
        mutateCreateStaffAsync: mutateAsync,
        ...rest,
    };
};

const useMutationUserCreateExpert = () => {
    const { mutate, mutateAsync, ...rest } = useMutation(async (dto: IV1UserCreateExpert) => userApi.v1CreateExpert(dto));

    return {
        mutateCreateExpert: mutate,
        mutateCreateExpertAsync: mutateAsync,
        ...rest,
    };
};

const useQueryUserTransactions = (filter: Partial<IV1UserTransactionFilter>) => {
    const { setTotalItem } = useTableUtil();
    return useQuery(
        ['transactions', filter],
        async () => {
            const res = await userApi.v1UserGetTransactions(filter);
            setTotalItem(res.total);
            return res.data;
        },
        {
            initialData: [],
        }
    );
};

const useUpdateUserProfileMutation = () => {
    const { mutate, mutateAsync, ...rest } = useMutation(async (dto: IV1UserUpdate) => userApi.v1UpdateUserProfile(dto));

    return {
        mutateUpdateProfile: mutate,
        mutateUpdateProfileAsync: mutateAsync,
        ...rest,
    };
};

export {
    useMutationUserCreateExpert,
    useMutationUserCreateStaff,
    useMutationUserUpdateMeAvatar,
    useQueryUserGetCVS,
    useQueryUserTransactions,
    useUpdateUserProfileMutation,
};
