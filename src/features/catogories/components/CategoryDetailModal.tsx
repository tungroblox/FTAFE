import { TableBuilder, TableHeaderCell } from '@components/tables';
import { CategoryAPI } from '@core/api/category.api';
import { productAPI } from '@core/api/product.api';
import { Category } from '@models/category';
import { Product } from '@models/product';
import { useQuery } from '@tanstack/react-query';
import { Descriptions, Image, Modal, ModalProps } from 'antd';
import Link from 'next/link';

//Category Detail Modal
interface CategoryDetail extends ModalProps {
    categoryId: string;
}
const CategoryDetailModal: React.FunctionComponent<CategoryDetail> = ({ categoryId, ...rest }) => {
    const { data } = useQuery<Category>({
        queryKey: ['category', categoryId],
        queryFn: async () => {
            const res = await CategoryAPI.getCategoryById(categoryId);

            return res?.payload;
        },
    });

    const getProductByCategoryQuery = useQuery({
        queryKey: ['products', categoryId],
        queryFn: async () => {
            const res = await productAPI.getProductsByCategoryId(categoryId);
            return res;
        },
    });

    const productList: Product[] = getProductByCategoryQuery.data?.payload;

    return (
        <Modal {...rest}>
            <Descriptions
                title="Category info"
                labelStyle={{
                    fontWeight: 'bold',
                }}
                bordered
                className="p-4 bg-white rounded-lg"
            >
                <Descriptions.Item label="Image" span={1}>
                    <Image height={80} width={80} className="rounded overflow-hidden" alt={data?.name} src={data?.image} />
                </Descriptions.Item>
                <Descriptions.Item label="Name" span={2}>
                    {data?.name}
                </Descriptions.Item>
                <Descriptions.Item label="Code" span={1}>
                    {data?.code}
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                    {data?.description}
                </Descriptions.Item>
                <Descriptions.Item label="Status">{data?.status}</Descriptions.Item>
                <Descriptions.Item label="createdAt">{data?.createdAt}</Descriptions.Item>
                <Descriptions.Item label="updatedAt">{data?.updatedAt}</Descriptions.Item>
                <Descriptions.Item label="systemPrice">{data?.systemPrice}</Descriptions.Item>
                <Descriptions.Item label="maxSystemPrice">{data?.maxSystemPrice}</Descriptions.Item>
                <Descriptions.Item label="minSystemPrice">{data?.minSystemPrice}</Descriptions.Item>
            </Descriptions>
            <Descriptions
                title="List Product"
                labelStyle={{
                    fontWeight: 'bold',
                }}
                bordered
                className="p-4 bg-white rounded-lg"
            >
                <div className="flex flex-col w-full gap-2">
                    <TableBuilder<Product>
                        rowKey="id"
                        isLoading={getProductByCategoryQuery.isLoading}
                        data={productList}
                        columns={[
                            {
                                title: () => <TableHeaderCell key="name" sortKey="name" label="name" />,
                                width: 400,
                                key: 'firstName',
                                render: ({ ...props }: Product) => <span>{props.name}</span>,
                            },
                            {
                                title: () => <TableHeaderCell key="" sortKey="" label="" />,
                                width: 400,
                                key: 'action',
                                render: ({ ...props }: Product) => <Link href={`product/${props.id}`}>Detail</Link>,
                            },
                        ]}
                    />
                </div>
            </Descriptions>
        </Modal>
    );
};
export default CategoryDetailModal;
