import { DashboardHeaderLayout } from '@components/layouts';
import { ProductAPI } from '@core/api/product.api';
import ProductDetail from '@features/product/ProductDetail';
import { Product } from '@models/product';
import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { ToggleProvider } from 'react-toggle-hook';
interface PageProps {
    id: string;
}

const Page: NextPage<PageProps> = ({ id }) => {
    const { data } = useQuery({
        queryFn: async () => await ProductAPI.getProductById(id),
        queryKey: ['product', id],
    });
    const product: Product = data?.payload;

    return (
        <ToggleProvider>
            <DashboardHeaderLayout title="Product Detail">
                <ProductDetail product={product} />
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
