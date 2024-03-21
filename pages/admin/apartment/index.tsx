import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { UserRole } from '@models/user';
import { NextPage } from 'next';

interface PageProps {}
const Page: NextPage<PageProps> = () => {
    return (
        <>
            <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
                <ModalProvider>
                    <TableUtilProvider>
                        <DashboardHeaderLayout title="Apartment Management">
                            <></>
                        </DashboardHeaderLayout>
                    </TableUtilProvider>
                </ModalProvider>
            </ProtectWrapper>
        </>
    );
};

export default Page;
