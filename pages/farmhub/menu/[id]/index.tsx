import { DashboardHeaderLayout } from '@components/layouts';
import CustomSkeleton from '@components/skeletons/CustomSkeleton';
import { ProtectWrapper } from '@components/wrappers';
import MenuDetail from '@features/farmhub/menu/MenuDetail';
import { useQueryGetMenuById } from '@hooks/api/farmhub.hook';
import { UserRole } from '@models/user';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';

interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    const { data: menuById, isFetched } = useQueryGetMenuById(id);

    return (
        <ProtectWrapper acceptRoles={[UserRole.FARM_HUB]}>
            <ToggleProvider>
                <DashboardHeaderLayout title={`${menuById?.name}`}>
                    {isFetched ? <MenuDetail menu={menuById} /> : <CustomSkeleton isFetched={isFetched} />}
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
