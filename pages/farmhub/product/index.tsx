import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import ProductList from '@features/farmhub/product/ProductList';
import { UserRole } from '@models/user';
import { NextPage } from 'next';

interface ProductPageProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const ProductPage: NextPage<ProductPageProps> = ({ filter }) => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.FARM_HUB]}>
            <ModalProvider>
                <TableUtilProvider>
                    <DashboardHeaderLayout title="Quản Lý Sản Phẩm">
                        <ProductList />
                    </DashboardHeaderLayout>
                </TableUtilProvider>
            </ModalProvider>
        </ProtectWrapper>
    );
};

export default ProductPage;
