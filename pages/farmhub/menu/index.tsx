import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import MenuList from '@features/farmhub/menu/MenuList';
import { UserRole } from '@models/user';
import { NextPage } from 'next';

interface MenuListPageProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const MenuListPage: NextPage<MenuListPageProps> = ({ filter }) => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.FARM_HUB]}>
            <ModalProvider>
                <TableUtilProvider>
                    <DashboardHeaderLayout title="Quản Lý Sản Phẩm">
                        <MenuList />
                    </DashboardHeaderLayout>
                </TableUtilProvider>
            </ModalProvider>
        </ProtectWrapper>
    );
};

export default MenuListPage;
