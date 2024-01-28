import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import StaffDetail from '@features/admin/user/staff/StaffDetail';
import { useQueryStaffById } from '@hooks/api/staff.hook';
import { UserRole } from '@models/user';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';

interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    const { data } = useQueryStaffById(id);
    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <ToggleProvider>
                <DashboardHeaderLayout title="Staff Detail">
                    <StaffDetail staff={data} />
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
