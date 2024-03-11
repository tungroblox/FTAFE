import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { CollectedHubFilter } from '@core/api/collected-hub.api';
import CollectedHubList from '@features/admin/user/collected-hub/CollectedHubList';
import { defaultPagingProps } from '@models/interface';
import { UserRole } from '@models/user';
import { objectHelper } from '@utils/index';
import { NextPage } from 'next';

interface CollectedHubPageProps {
    filter: Partial<CollectedHubFilter>;
}

const CollectedHubPage: NextPage<CollectedHubPageProps> = ({ filter }) => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <ModalProvider>
                <TableUtilProvider>
                    <DashboardHeaderLayout title="Collected hub">
                        <CollectedHubList filter={filter} />
                    </DashboardHeaderLayout>
                </TableUtilProvider>
            </ModalProvider>
        </ProtectWrapper>
    );
};

CollectedHubPage.getInitialProps = async (ctx): Promise<CollectedHubPageProps> => {
    return {
        filter: objectHelper.getObjectWithDefault<Partial<CollectedHubFilter>>(ctx.query, {
            ...defaultPagingProps,
            name: '',
            description: '',
            address: '',
        }),
    };
};
export default CollectedHubPage;
