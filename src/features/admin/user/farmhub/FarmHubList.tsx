import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { FarmHubAPI } from '@core/api/farmhub';
// import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
import { routes } from '@core/routes';
import { useQueryFarmHub } from '@hooks/api/farmhub.hook';
import { FarmHub } from '@models/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { stringHelper } from '@utils/index';
// import { ExpertList } from '@models/expert';
import { Button, Dropdown, Image, Menu, Modal, Tag } from 'antd';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-toastify';

interface FarmHubListProps {}

const FarmHubList: React.FunctionComponent<FarmHubListProps> = () => {
    const { data, isLoading } = useQueryFarmHub();

    const farmHub: FarmHub[] = data?.payload;

    const router = useRouter();

    const deleteFarmHubMutation = useMutation({
        mutationKey: ['farm-hub'],
        mutationFn: async (id: string) => await FarmHubAPI.deleteFarmHub(id),
    });
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
                    await deleteFarmHubMutation.mutateAsync(id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries(['farm-hub']);
                            toast.success('FarmHub deleted successfully!');
                        },
                    });
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
                        router.push(routes.admin.user.farm_hub.create());
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-white duration-300 hover:text-white hover:bg-primary/90 bg-primary"
                >
                    <PlusIcon className="w-5 h-5 text-white" />
                    <span>Create New Farm Hub</span>
                </button>
            </div>
            <TableBuilder<FarmHub>
                rowKey="id"
                isLoading={isLoading}
                data={farmHub}
                columns={[
                    {
                        title: () => <TableHeaderCell key="image" sortKey="image" label="image" />,
                        width: 400,
                        key: 'image',
                        render: ({ ...props }: FarmHub) => (
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
                        title: () => <TableHeaderCell key="name" sortKey="name" label="Farm Name" />,
                        width: 400,
                        key: 'name',
                        render: ({ ...props }: FarmHub) => (
                            <TableBodyCell label={<Link href={routes.admin.user.farm_hub.detail(props.id)}>{props.name}</Link>} />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                        width: 400,
                        key: 'status',
                        render: ({ ...props }: FarmHub) => {
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
                                                <Button>
                                                    <Link href={routes.admin.user.farm_hub.update(props.id)}>Edit</Link>
                                                </Button>
                                            </Menu.Item>

                                            <Menu.Item key="2">
                                                <Button onClick={() => handleDelete(props?.id)}>Delete</Button>
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
        </div>
    );
};

export default FarmHubList;
