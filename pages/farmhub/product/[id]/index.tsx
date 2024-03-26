import { DashboardHeaderLayout } from '@components/layouts';
import CustomSkeleton from '@components/skeletons/CustomSkeleton';
import { productAPI } from '@core/api/product.api';
import ProductDetailFarmHub from '@features/farmhub/product/ProductDetailFarmHub';
import { Product } from '@models/product';
import { useStoreUser } from '@store/index';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';
interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    const { data } = useQuery({
        queryFn: async () => await productAPI.getProductById(id),
        queryKey: ['product', id],
    });
    const product: Product = data?.payload;
    const { farmHub } = useStoreUser();
    return (
        <ToggleProvider>
            <DashboardHeaderLayout title=" Thông tin sản phẩm">
                {farmHub?.id ? <ProductDetailFarmHub product={product} farmHubId={farmHub?.id} /> : <CustomSkeleton isFetched={true} />}
            </DashboardHeaderLayout>
        </ToggleProvider>
    );
};
Page.getInitialProps = async (ctx): Promise<PageProps> => {
    const id = String(ctx.query.id || '');

    return {
        id,
    };
};
export default Page;
