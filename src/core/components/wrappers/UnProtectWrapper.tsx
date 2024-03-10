import { routes } from '@core/routes';
import { useStoreUser } from '@store/index';
import { useRouter } from 'next/router';
import * as React from 'react';

interface UnProtectionWrapperProps {
    children: React.ReactNode;
}

export const UnProtectWrapper: React.FC<UnProtectionWrapperProps> = ({ children }) => {
    const user = useStoreUser();
    const router = useRouter();
    React.useEffect(() => {
        if (user.isAuth) {
            // switch (user.type) {
            //     case UserRole.CANDIDATE:
            //         router.push(routes.job.list());
            //         break;
            //     case UserRole.ADMIN:
            //         if (!router.pathname.startsWith('/admin')) router.push(routes.admin.home());
            //         break;
            //     case UserRole.EXPERT:
            //         if (!router.pathname.startsWith('/expert')) router.push(routes.expert.home());
            //         break;
            //     case UserRole.STAFF:
            //         if (!router.pathname.startsWith('/staff')) router.push(routes.staff.home());
            //         break;
            //     default:
            //     }
            // }
            router.push(routes.admin.home());
        }
        // else {
        //     toast.error('Bạn không có quyền truy cập');
        //     authApi.v1GetLogout().then(() => {
        //         setTimeout(() => {
        //             // window.location.reload();
        //         }, 3000);
        //     });
        // }
    }, [user]);

    return <>{children}</>;
};
