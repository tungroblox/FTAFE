import { DashboardHeaderLayout } from '@components/layouts';
import FarmHubDetail from '@features/admin/user/farmhub/FarmHubDetail';
import { FarmHub, UserRole } from '@models/user';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';

interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    // const { data } = useQueryCandidateById(id);
    const data: FarmHub = {
        id: 'UUID',
        address: 'abc',
        description: 'abc',
        image: 'https://images.unsplash.com/photo-1706361635623-6606c945503e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Company Name',
        status: 'Active',
        created_at: new Date().toString(),
        user: {
            id: '1',
            email: 'john123@gmail.com',
            type: UserRole.FARM_HUB,
        },
    };
    return (
        // <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
        <ToggleProvider>
            <DashboardHeaderLayout title="FarmHub Detail">
                <FarmHubDetail farmhub={data} />
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
