import { TableBuilder, TableHeaderCell } from '@components/tables';
import { ProductAPI } from '@core/api/product.api';
import { routes } from '@core/routes';
import { Product } from '@models/product';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Dropdown, Menu, Modal, Tag } from 'antd';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { toast } from 'react-toastify';

import CreateProductModal from './components/CreateProductModal';
import UpdateProductModal from './components/UpdateProductModal';

interface ProductListProps {}

const ProductList: React.FunctionComponent<ProductListProps> = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await ProductAPI.getProducts();
            return res;
        },
    });
    const products: Product[] = data?.payload;

    const [openCreateModalState, setOpenCreateModalState] = React.useState<boolean>(false);
    // Update modal
    const [openUpdateModalState, setOpenUpdateModalState] = React.useState<boolean>(false);
    const [productValue, setProductValue] = React.useState({
        id: '',
        categoryId: '',
        name: '',
        description: '',
        code: '',
        status: '',
        label: '',
        createdAt: '',
        updatedAt: '',
    });

    const deleteProductMutation = useMutation({
        mutationFn: async (productId: string) => {
            const res = await ProductAPI.deleteProduct(productId);
            return res;
        },
    });

    const handleDeleteProduct = (id: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You will not be able to recover this data!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                try {
                    deleteProductMutation.mutateAsync(id);
                    toast.success('Product deleted successfully!');
                } catch (error) {
                    console.error('Error deleting FarmHub:', error);
                }
            },
        });
    };

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col items-end w-full gap-2 ">
                <button
                    onClick={() => {
                        setOpenCreateModalState(!openCreateModalState);
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-white duration-300 hover:text-white hover:bg-primary/90 bg-primary"
                >
                    <PlusIcon className="w-5 h-5 text-white" />
                    <span>Create New Product</span>
                </button>
            </div>
            {/* <FormFilterWrapper<IV1GetFilterExpert> defaultValues={{ ...filter }}>
                <div className="w-56">
                    <TextInput name="name" label="Name" />
                </div>
                <div className="w-56">
                    <TextInput name="email" label="Email" />
                </div>
            </FormFilterWrapper> */}

            <TableBuilder<Product>
                rowKey="id"
                isLoading={isLoading}
                data={products}
                columns={[
                    {
                        title: () => <TableHeaderCell key="name" sortKey="name" label="Product Name" />,
                        width: 400,
                        key: 'name',
                        render: ({ ...props }: Product) => <Link href={routes.admin.product.detail(props.id)}>{props.name}</Link>,
                    },
                    {
                        title: () => <TableHeaderCell key="code" sortKey="code" label="Code" />,
                        width: 400,
                        key: 'code',
                        render: ({ ...props }: Product) => <span>{props.code}</span>,
                    },
                    {
                        title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                        width: 400,
                        key: 'status',
                        render: ({ ...props }: Product) => {
                            return (
                                <Tag
                                    className={clsx(`text-sm whitespace-normal`)}
                                    color={typeof props.status === 'string' && props.status === 'Active' ? 'geekblue' : 'volcano'}
                                >
                                    {props.status}
                                </Tag>
                            );
                        },
                    },
                    {
                        title: () => <TableHeaderCell key="" sortKey="" label="" />,
                        width: 400,
                        key: 'action',
                        render: ({ ...props }: Product) => {
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="1">
                                                <Button
                                                    onClick={() => {
                                                        setOpenUpdateModalState(!openUpdateModalState);
                                                        setProductValue(props);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </Menu.Item>

                                            <Menu.Item key="2">
                                                <Button onClick={() => handleDeleteProduct(props.id)}>Delete</Button>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                    trigger={['click']}
                                >
                                    <span className="cursor-pointer">Actions</span>
                                </Dropdown>
                            );
                        },
                    },
                ]}
            />
            <CreateProductModal open={openCreateModalState} onCancel={() => setOpenCreateModalState(false)} />
            <UpdateProductModal open={openUpdateModalState} onCancel={() => setOpenUpdateModalState(false)} currentValue={productValue} />
        </div>
    );
};

export default ProductList;
