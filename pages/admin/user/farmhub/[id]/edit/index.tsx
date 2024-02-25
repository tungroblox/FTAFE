import { DashboardHeaderLayout } from '@components/layouts';
import FarmHubEdit from '@features/admin/user/farmhub/FarmHubEdit';
import { useQueryFarmHubById } from '@hooks/api/farmhub.hook';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';

interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    const { data } = useQueryFarmHubById(id);

    const farmHub = data?.payload;
    return (
        // <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
        <ToggleProvider>
            <DashboardHeaderLayout title="FarmHub update information">
                <FarmHubEdit farmHub={farmHub} />
            </DashboardHeaderLayout>
        </ToggleProvider>
        // </ProtectWrapper>
    );
};

Page.getInitialProps = async (ctx): Promise<PageProps> => {
    const id = String(ctx.query.id || '');

    return {
        id,
    };
};

export default Page;
