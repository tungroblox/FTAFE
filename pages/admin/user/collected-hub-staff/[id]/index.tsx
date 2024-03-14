import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { CollectedHubAPI } from '@core/api/collected-hub.api';
import HubDetail from '@features/admin/user/collected-hub/HubDetail';
import { UserRole } from '@models/user';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';

interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    const { data } = useQuery({
        queryKey: ['collected-hub', id],
        queryFn: async () => await CollectedHubAPI.getById(id),
    });

    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <ToggleProvider>
                <DashboardHeaderLayout title="Hub Detail">
                    <HubDetail value={data?.payload} />
                </DashboardHeaderLayout>
            </ToggleProvider>
        </ProtectWrapper>
    );
};

Page.getInitialProps = async (ctx): Promise<PageProps> => {
    const id = String(ctx.query.id || '');
    return {
        id,
    };
};

export default Page;
