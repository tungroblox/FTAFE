import { authApi, IV1AuthLogin } from '@core/api';
import { constant } from '@core/constant';
import { store } from '@store/index';
import { userThunk } from '@store/user/thunks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const useAuthLoginMutation = () => {
    const router = useRouter();

    const { mutate, mutateAsync, ...rest } = useMutation(async (input: IV1AuthLogin) => await authApi.v1PostLogin(input), {
        onSuccess: async (data) => {
            localStorage.setItem(constant.TOKEN_KEY, data);
            store.dispatch(userThunk.getCurrentUser());
        },
        onError: (error) => {
            toast.error('Đăng nhập thất bại!');
        },
    });

    return {
        mutationAuthLogin: mutate,
        mutationAuthLoginAsync: mutateAsync,
        ...rest,
    };
};

const useLogoutMutation = () => {
    const { mutate, mutateAsync, ...rest } = useMutation(
        async () => {
            localStorage.removeItem(constant.TOKEN_KEY);
            return await authApi.v1GetLogout();
        },
        {
            onSuccess: async () => {
                store.dispatch(userThunk.getCurrentUser());
            },
        }
    );

    return {
        mutationLogout: mutate,
        mutationLogoutAsync: mutateAsync,
        ...rest,
    };
};

export { useAuthLoginMutation, useLogoutMutation };
