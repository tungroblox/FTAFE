import { TableBuilder, TableHeaderCell } from '@components/tables';
import { ProductItemAPI } from '@core/api/product-item.api';
import { routes } from '@core/routes';
import { Product } from '@models/product';
import { ProductItem } from '@models/product-item';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Descriptions, Modal } from 'antd';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface ProductDetailProps {
    product: Product;
}
const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const { data, isLoading } = useQuery({
        queryFn: async (_) => await ProductItemAPI.getAllByProductId(product.id),
        queryKey: ['product-items', 'product', product?.id],
    });

    const item: ProductItem[] = data?.payload;

    const deleteItemMutation = useMutation(async (id: string) => await ProductItemAPI.deleteProductItem(id));

    const queryClient = useQueryClient();

    const handleDeleteProductItem = (id: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You will not be able to recover this data!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                try {
                    deleteItemMutation.mutateAsync(id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries(['product-items', 'product', product?.id]);
                            toast.success('Product deleted successfully!');
                        },
                    });
                } catch (error) {
                    console.error('Error deleting FarmHub:', error);
                }
            },
        });
    };

    return (
        <>
            <div className="flex flex-col w-full gap-4">
                <Descriptions
                    labelStyle={{
                        fontWeight: 'bold',
                    }}
                    bordered
                    title={'Basic Information'}
                    className="p-4 bg-white rounded-lg"
                    extra={<Button>Update</Button>}
                >
                    <Descriptions.Item label="product's name" span={3}>
                        {product?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={1}>
                        {product?.code}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={1}>
                        <Badge status={product?.status === 'Active' ? 'processing' : 'error'} text={product?.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={2}>
                        {product?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions
                    labelStyle={{
                        fontWeight: 'bold',
                    }}
                    bordered
                    title={'Items'}
                    className="p-4 bg-white rounded-lg"
                >
                    <div className="flex flex-col w-full gap-2">
                        <TableBuilder<ProductItem>
                            rowKey="id"
                            isLoading={isLoading}
                            data={item}
                            columns={[
                                {
                                    title: () => <TableHeaderCell key="title" sortKey="title" label="title" />,
                                    width: 400,
                                    key: 'title',
                                    render: ({ ...props }: ProductItem) => <p>{props.title}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="productOrigin" sortKey="productOrigin" label="productOrigin" />,
                                    width: 400,
                                    key: 'productOrigin',
                                    render: ({ ...props }: ProductItem) => <p>{props.productOrigin}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="description" sortKey="description" label="Description" />,
                                    width: 400,
                                    key: 'description',
                                    render: ({ ...props }: ProductItem) => <p>{props.description}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="quantity" sortKey="quantity" label="quantity" />,
                                    width: 200,
                                    key: 'quantity',
                                    render: ({ ...props }: ProductItem) => <span>{props.quantity}</span>,
                                },
                                {
                                    title: () => <TableHeaderCell key="price" sortKey="price" label="Price" />,
                                    width: 150,
                                    key: 'price',
                                    render: ({ ...props }: ProductItem) => <span>{props.price}</span>,
                                },
                                {
                                    title: () => <TableHeaderCell key="farmHubId" sortKey="farmHubId" label="Farm Hub ID" />,
                                    width: 400,
                                    key: 'farmHubId',
                                    render: ({ ...props }: ProductItem) => {
                                        return <Link href={routes.admin.user.farm_hub.detail(props.farmHubId)}>{props.farmHubId}</Link>;
                                    },
                                },
                                {
                                    title: () => <TableHeaderCell key="" sortKey="" label="" />,
                                    width: 200,
                                    key: 'action',
                                    render: ({ ...props }: Product) => {
                                        return <Button onClick={() => handleDeleteProductItem(props.id)}>Delete</Button>;
                                    },
                                },
                            ]}
                        />
                    </div>
                </Descriptions>
            </div>
        </>
    );
};

export default ProductDetail;
