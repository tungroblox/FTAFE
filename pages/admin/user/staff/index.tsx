import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { IV1GetFilterExpert } from '@core/api/expert.api';
import { IV1GetFilterStaff } from '@core/api/staff.api';
import StaffList from '@features/admin/user/staff/StaffList';
import { defaultPagingProps } from '@models/interface';
import { UserRole } from '@models/user';
import { objectHelper } from '@utils/index';
import { NextPage } from 'next';
import * as React from 'react';

interface StaffListPageProps {
    filter: Partial<IV1GetFilterStaff>;
}

const StaffListPage: NextPage<StaffListPageProps> = ({ filter }) => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <ModalProvider>
                <TableUtilProvider>
                    <DashboardHeaderLayout title="Staff Management">
                        <StaffList filter={filter} />
                    </DashboardHeaderLayout>
                </TableUtilProvider>
            </ModalProvider>
        </ProtectWrapper>
    );
};

StaffListPage.getInitialProps = async (ctx): Promise<StaffListPageProps> => {
    return {
        filter: objectHelper.getObjectWithDefault<Partial<IV1GetFilterStaff>>(ctx.query, {
            ...defaultPagingProps,
            name: '',
            email: '',
            phone: '',
        }),
    };
};
export default StaffListPage;
