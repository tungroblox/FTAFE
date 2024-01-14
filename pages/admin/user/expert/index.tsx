import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { IV1GetFilterExpert } from '@core/api/expert.api';
import ExpertList from '@features/admin/user/expert/ExpertList';
import { defaultPagingProps } from '@models/interface';
import { UserRole } from '@models/user';
import { objectHelper } from '@utils/index';
import { NextPage } from 'next';
import * as React from 'react';

interface ExpertListPageProps {
    filter: Partial<IV1GetFilterExpert>;
}

const ExpertListPage: NextPage<ExpertListPageProps> = ({ filter }) => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <ModalProvider>
                <TableUtilProvider>
                    <DashboardHeaderLayout title="Expert List">
                        <ExpertList filter={filter} />
                    </DashboardHeaderLayout>
                </TableUtilProvider>
            </ModalProvider>
        </ProtectWrapper>
    );
};

ExpertListPage.getInitialProps = async (ctx): Promise<ExpertListPageProps> => {
    return {
        filter: objectHelper.getObjectWithDefault<Partial<IV1GetFilterExpert>>(ctx.query, {
            ...defaultPagingProps,
            name: '',
            email: '',
            skillLevels: [],
        }),
    };
};
export default ExpertListPage;
