import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import BusinessDayList from '@features/farmhub/business-day/BusinessDayList';
import { UserRole } from '@models/user';
import { NextPage } from 'next';
interface PageProps {}

const Page: NextPage<PageProps> = () => {
    return (
        <>
            <ProtectWrapper acceptRoles={[UserRole.FARM_HUB]}>
                <ModalProvider>
                    <TableUtilProvider>
                        <DashboardHeaderLayout title="Ngày Đăng Bán">
                            <BusinessDayList />
                        </DashboardHeaderLayout>
                    </TableUtilProvider>
                </ModalProvider>
            </ProtectWrapper>
        </>
    );
};
export default Page;
