import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import FarmHubList from '@features/admin/user/farmhub/FarmHubList';
import { UserRole } from '@models/user';
import { NextPage } from 'next';

interface PageProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const Page: NextPage<PageProps> = ({ filter }) => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <ModalProvider>
                <TableUtilProvider>
                    <DashboardHeaderLayout title="Farm Hub Management">
                        <FarmHubList />
                    </DashboardHeaderLayout>
                </TableUtilProvider>
            </ModalProvider>
        </ProtectWrapper>
    );
};

export default Page;
