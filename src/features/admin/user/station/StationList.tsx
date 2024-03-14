import { DashOutlined } from '@ant-design/icons';
import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { IV1GetFilterExpert } from '@core/api/expert.api';
import { StationAPI, StationFilter } from '@core/api/station.api';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CollectedHub, Station } from '@models/staff';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { stringHelper } from '@utils/index';
import { Button, Dropdown, Image, Menu, Modal, Tag } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';

import CreateStationModal from './components/CreateStationModal';
import UpdateStationModal from './components/UpdateStationModal';

interface StationListProps {
    filter: Partial<StationFilter>;
}

const StationList: React.FunctionComponent<StationListProps> = ({ filter }) => {
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ['stations', filter],
        queryFn: async () => {
            const res = await StationAPI.getAll(filter);
            return res;
        },
    });
    const hubs: Station[] = data;

    const deleteCollectedHubMutation = useMutation(async (id: string) => await StationAPI.deleteOne(id));

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
                    await deleteCollectedHubMutation.mutateAsync(id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries(['collected-hub-list', filter]);
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
                    <span>Create New Station</span>
                </button>
            </div>

            <FormFilterWrapper<IV1GetFilterExpert> defaultValues={{ ...filter }}>
                <div className="w-56">
                    <TextInput name="name" label="Name" />
                </div>
                <div className="w-56">
                    <TextInput name="description" label="Description" />
                </div>
                <div className="w-56">
                    <TextInput name="address" label="Address" />
                </div>
            </FormFilterWrapper>

            <TableBuilder<CollectedHub>
                rowKey="id"
                isLoading={isLoading}
                data={hubs}
                columns={[
                    {
                        title: () => <TableHeaderCell key="image" sortKey="image" label="image" />,
                        width: 100,
                        key: 'image',
                        render: ({ ...props }: Station) => (
                            <TableBodyCell
                                label={
                                    <Image
                                        alt=""
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
                        width: 300,
                        key: 'name',
                        render: ({ ...props }: Station) => {
                            return <TableBodyCell label={<Link href={`station/${props.id}`}>{props.name}</Link>} />;
                        },
                    },
                    {
                        title: () => <TableHeaderCell key="description" sortKey="description" label="Description" />,
                        width: 400,
                        key: 'description',
                        render: ({ ...props }: Station) => <TableBodyCell label={<span>{props.description}</span>} />,
                    },

                    {
                        title: () => <TableHeaderCell key="address" sortKey="address" label="address" />,
                        width: 400,
                        key: 'address',
                        render: ({ ...props }: Station) => <TableBodyCell label={<span>{props.address}</span>} />,
                    },
                    {
                        title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                        width: 100,
                        key: 'status',
                        render: ({ ...props }: Station) => {
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
                        render: ({ ...props }) => {
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item key="1">
                                                <Button
                                                    onClick={() => {
                                                        setCurrentValue(props);
                                                        setUpdateModalState(!updateModalState);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </Menu.Item>

                                            <Menu.Item key="2">
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
            <CreateStationModal
                open={openCreateModalState}
                afterClose={() => setOpenCreateModalState(false)}
                onCancel={() => setOpenCreateModalState(false)}
            />
            <UpdateStationModal
                open={updateModalState}
                currentValue={currentValue}
                onCancel={() => setUpdateModalState(false)}
                afterClose={() => setUpdateModalState(false)}
            />
        </div>
    );
};

export default StationList;
