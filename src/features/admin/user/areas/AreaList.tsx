import { DashOutlined } from '@ant-design/icons';
import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { AreaAPI } from '@core/api/area.api';
import { IV1GetFilterExpert } from '@core/api/expert.api';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Area, AreaFilter } from '@models/area';
import { Station } from '@models/staff';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown, Menu, Modal, Tag } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';

interface AreaListProps {
    filter: Partial<AreaFilter>;
}

const AreaList: React.FunctionComponent<AreaListProps> = ({ filter }) => {
    console.log('filter:', filter);
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ['areas', filter],
        queryFn: async () => {
            const res = await AreaAPI.getAll(filter);
            return res;
        },
    });

    const areas: Area[] = data || [];

    const deleteAreaMutation = useMutation(async (id: string) => await AreaAPI.deleteOne(id));

    const queryClient = useQueryClient();

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You will not be able to recover this data!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                try {
                    await deleteAreaMutation.mutateAsync(id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries(['areas', filter]);
                            toast.success('FarmHub deleted successfully!');
                        },
                    });
                } catch (error) {
                    console.error('Error deleting FarmHub:', error);
                }
            },
        });
    };
    //Open modal
    const [openCreateModalState, setOpenCreateModalState] = React.useState<boolean>(false);
    //Update modal
    const [updateModalState, setUpdateModalState] = React.useState<boolean>(false);
    const [currentValue, setCurrentValue] = React.useState<Station>({
        id: '',
        name: '',
        description: '',
        image: '',
        code: '',
        status: '',
        address: '',
        createdAt: '',
        updatedAt: '',
        areaId: '',
        area: null,
    });

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col items-end w-full gap-2 ">
                <button
                    onClick={() => setOpenCreateModalState(!openCreateModalState)}
                    className="flex items-center gap-1 px-3 py-1 text-white duration-300 hover:text-white hover:bg-primary/90 bg-primary"
                >
                    <PlusIcon className="w-5 h-5 text-white" />
                    <span>Create New Area</span>
                </button>
            </div>

            <FormFilterWrapper<IV1GetFilterExpert> defaultValues={{ ...filter }}>
                <div className="w-56">
                    <TextInput name="address" label="address" />
                </div>
                <div className="w-56">
                    <TextInput name="commune" label="commune" />
                </div>
                <div className="w-56">
                    <TextInput name="district" label="district" />
                </div>
                <div className="w-56">
                    <TextInput name="province" label="province" />
                </div>
            </FormFilterWrapper>

            <TableBuilder<Area>
                rowKey="id"
                isLoading={isLoading}
                data={areas}
                columns={[
                    {
                        title: () => <TableHeaderCell key="province" sortKey="province" label="province" />,
                        width: 400,
                        key: 'province',
                        render: ({ ...props }: Area) => <TableBodyCell label={<span>{props.province}</span>} />,
                    },
                    {
                        title: () => <TableHeaderCell key="district" sortKey="district" label="district" />,
                        width: 400,
                        key: 'district',
                        render: ({ ...props }: Area) => <TableBodyCell label={<span>{props.district}</span>} />,
                    },
                    {
                        title: () => <TableHeaderCell key="commune" sortKey="commune" label="commune" />,
                        width: 400,
                        key: 'commune',
                        render: ({ ...props }: Area) => <TableBodyCell label={<span>{props.commune}</span>} />,
                    },

                    {
                        title: () => <TableHeaderCell key="address" sortKey="address" label="address" />,
                        width: 400,
                        key: 'address',
                        render: ({ ...props }: Area) => <TableBodyCell label={<span>{props.address}</span>} />,
                    },
                    {
                        title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                        width: 100,
                        key: 'status',
                        render: ({ ...props }: Area) => {
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
                        width: 50,
                        key: 'action',
                        render: ({ ...props }: Area) => {
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="1">
                                                <Button onClick={() => router.push(`/admin/area/${props.id}`)}>Detail</Button>
                                            </Menu.Item>
                                            <Menu.Item key="2">
                                                <Button
                                                    onClick={() => {
                                                        // setCurrentValue(props);
                                                        // setUpdateModalState(!updateModalState);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </Menu.Item>

                                            <Menu.Item key="3">
                                                <Button onClick={() => handleDelete(props.id)}>Delete</Button>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                    trigger={['click']}
                                >
                                    <DashOutlined />
                                </Dropdown>
                            );
                        },
                    },
                ]}
            />
            {/* <CreateStationModal
                open={openCreateModalState}
                afterClose={() => setOpenCreateModalState(false)}
                onCancel={() => setOpenCreateModalState(false)}
            />
            <UpdateStationModal
                open={updateModalState}
                currentValue={currentValue}
                onCancel={() => setUpdateModalState(false)}
                afterClose={() => setUpdateModalState(false)}
            /> */}
        </div>
    );
};

export default AreaList;
