import { WarningOutlined } from '@ant-design/icons';
import { TableBuilder, TableHeaderCell } from '@components/tables';
import { ProductItemAPI } from '@core/api/product-item.api';
import { routes } from '@core/routes';
import { Product } from '@models/product';
import { ProductItem } from '@models/product-item';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Descriptions, Image, Modal } from 'antd';
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
            title: 'Bạn có muốn xoá?',
            content: 'Hành động này sẽ không thể hoàn tác lại được!',
            okText: 'Xoá!',
            okType: 'danger',
            icon: <WarningOutlined style={{ color: 'red' }} />,
            cancelText: 'Trở lại',
            onOk: async () => {
                try {
                    deleteItemMutation.mutateAsync(id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries(['product-items', 'product', product?.id]);
                            toast.success('Xoá thành công!');
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
                    title={'Thông tin liên quan đến sản phẩm'}
                    className="p-4 bg-white rounded-lg"
                    extra={<Button>Update</Button>}
                >
                    <Descriptions.Item label="Sản Phẩm" span={3}>
                        {product?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã Code" span={1}>
                        {product?.code}
                    </Descriptions.Item>

                    <Descriptions.Item label="Trạng thái" span={1}>
                        <Badge status={product?.status === 'Active' ? 'processing' : 'error'} text={product?.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo" span={2}>
                        {product?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions
                    labelStyle={{
                        fontWeight: 'bold',
                    }}
                    bordered
                    title={`Các sản phẩm của ${product?.name}`}
                    className="p-4 bg-white rounded-lg"
                >
                    <div className="flex flex-col w-full gap-2">
                        <TableBuilder<ProductItem>
                            rowKey="id"
                            isLoading={isLoading}
                            data={item}
                            columns={[
                                {
                                    title: () => <></>,
                                    width: 200,
                                    render: ({ ...props }: ProductItem) => (
                                        <Image
                                            src={props.productImages.length > 0 ? props.productImages[0].imageUrl : ''}
                                            width={150}
                                            alt={props.productImages.length > 0 ? props.productImages[0].caption : ''}
                                            fallback="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                                        />
                                    ),
                                },
                                {
                                    title: () => <TableHeaderCell key="title" sortKey="title" label="Tên" />,
                                    width: 200,
                                    key: 'title',
                                    render: ({ ...props }: ProductItem) => <p>{props.title}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="productOrigin" sortKey="productOrigin" label="Nơi sản xuất" />,
                                    width: 200,
                                    key: 'productOrigin',
                                    render: ({ ...props }: ProductItem) => <p>{props.productOrigin}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="description" sortKey="description" label="Mô tả sản phẩm" />,
                                    width: 500,
                                    key: 'description',
                                    render: ({ ...props }: ProductItem) => <p>{props.description}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="quantity" sortKey="quantity" label="Số lượng" />,
                                    width: 150,
                                    key: 'quantity',
                                    render: ({ ...props }: ProductItem) => <span>{props.quantity}</span>,
                                },
                                {
                                    title: () => <TableHeaderCell key="price" sortKey="price" label="Giá tiền/VND" />,
                                    width: 200,
                                    key: 'price',
                                    render: ({ ...props }: ProductItem) => <span>{props.price}</span>,
                                },
                                {
                                    title: () => <TableHeaderCell key="unit" sortKey="unit" label="Đơn vị" />,
                                    width: 200,
                                    key: 'unit',
                                    render: ({ ...props }: ProductItem) => <span>{props.unit}</span>,
                                },
                                {
                                    title: () => <TableHeaderCell key="status" sortKey="status" label="Trạng thái" />,
                                    width: 400,
                                    key: 'status',
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
