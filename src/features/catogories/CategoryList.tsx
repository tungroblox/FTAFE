import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import { CategoryAPI } from '@core/api/category.api';
import { Category } from '@models/category';
import { useMutation, useQuery } from '@tanstack/react-query';
import { stringHelper } from '@utils/index';
import { Button, Dropdown, Image, Menu, Modal, Tag } from 'antd';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import * as React from 'react';
import { toast } from 'react-toastify';

import CategoryDetailModal from './components/CategoryDetailModal';
import CreateCategoryModal from './components/CreateCategoryModal';
import UpdateCategoryModal from './components/UpdateCategoryModal';

interface CategoryListProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const CategoryList: React.FunctionComponent<CategoryListProps> = (filter) => {
    const [openDetailModal, setOpenDetailModalState] = React.useState<boolean>(false);
    const [categoryDetailId, setCategoryDetailId] = React.useState<string>('');

    const setOpenDetailModal = (isOpen: boolean, categoryId: string) => {
        setCategoryDetailId(categoryId);
        setOpenDetailModalState(isOpen);
    };

    const [openUpdateModal, setOpenUpdateModalState] = React.useState<boolean>(false);
    const [defaultCategory, setDefaultCategoryState] = React.useState<Category>({
        id: '',
        name: '',
        description: '',
        image: '',
        code: '',
        status: '',
        displayIndex: 0,
        systemPrice: 0,
        minSystemPrice: 0,
        maxSystemPrice: 0,
        margin: 0,
        createdAt: '',
        updatedAt: '',
    });

    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await CategoryAPI.getAllCategories();
            return res;
        },
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: async (categoryId: string) => {
            const res = await CategoryAPI.deleteCategory(categoryId);
            return res;
        },
    });

    const [openCreateModalState, setOpenCreateModalState] = React.useState<boolean>(false);

    const handleDeleteCategory = (id: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You will not be able to recover this data!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                try {
                    await deleteCategoryMutation.mutateAsync(id);
                    toast.success('FarmHub deleted successfully!');
                } catch (error) {
                    console.error('Error deleting FarmHub:', error);
                }
            },
        });
    };

    const categories: Category[] = data?.payload;

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col items-end w-full gap-2 ">
                <button
                    onClick={() => setOpenCreateModalState(!openCreateModalState)}
                    className="flex items-center gap-1 px-3 py-1 text-white duration-300 hover:text-white hover:bg-primary/90 bg-primary"
                >
                    <PlusIcon className="w-5 h-5 text-white" />
                    <span>Create New Category</span>
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

            <TableBuilder<Category>
                rowKey="id"
                isLoading={isLoading}
                data={categories}
                columns={[
                    {
                        title: () => <TableHeaderCell key="image" sortKey="image" label="image" />,
                        width: 200,
                        key: 'image',
                        render: ({ ...props }: Category) => (
                            <TableBodyCell
                                label={
                                    <Image
                                        alt={props.name}
                                        width={64}
                                        height={64}
                                        className="rounded overflow-hidden"
                                        src={props.image ? props.image : stringHelper.convertTextToAvatar(props.name)}
                                    />
                                }
                            />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="name" sortKey="name" label="Name" />,
                        width: 400,
                        key: 'name',
                        render: ({ ...props }: Category) => (
                            // <TableBodyCell label={<Link href={routes.admin.user.farm_hub.detail(props.id)}>{props.name}</Link>} />
                            <Button type="text" onClick={() => setOpenDetailModal(true, props.id)}>
                                {props.name}
                            </Button>
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="description" sortKey="description" label="Mô tả" />,
                        width: 400,
                        key: 'description',
                        render: ({ ...props }: Category) => (
                            // <TableBodyCell label={<Link href={routes.admin.user.farm_hub.detail(props.id)}></Link>} />
                            <span>{props.description}</span>
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                        width: 400,
                        key: 'status',
                        render: ({ ...props }: Category) => {
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
                        render: ({ ...props }) => {
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="1">
                                                <Button
                                                    onClick={() => {
                                                        setOpenUpdateModalState(true);
                                                        setDefaultCategoryState(props);
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            </Menu.Item>
                                            <Menu.Item key="2">
                                                <Button onClick={() => handleDeleteCategory(props.id)}>Delete</Button>
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
            <CategoryDetailModal
                categoryId={categoryDetailId}
                footer={null}
                width={1000}
                open={openDetailModal}
                onCancel={() => setOpenDetailModalState(false)}
            />

            <UpdateCategoryModal
                category={defaultCategory}
                width={1000}
                open={openUpdateModal}
                afterClose={() => setOpenUpdateModalState(false)}
                onCancel={() => setOpenUpdateModalState(false)}
            />

            <CreateCategoryModal
                open={openCreateModalState}
                afterClose={() => setOpenCreateModalState(false)}
                onCancel={() => setOpenCreateModalState(false)}
            />
        </div>
    );
};

export default CategoryList;
