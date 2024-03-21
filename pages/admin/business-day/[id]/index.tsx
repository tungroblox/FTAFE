import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { BusinessDayAPI } from '@core/api/business-day.api';
import { UserRole } from '@models/user';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';

interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    const { data } = useQuery({
        queryKey: ['business-day', id],
        queryFn: async () => await BusinessDayAPI.getById(id),
    });

    const businessDays = data?.payload;
    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <ToggleProvider>
                <DashboardHeaderLayout title={`${businessDays?.name}`}>
                    <></>
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
