import { TableBuilder, TableHeaderCell } from '@components/tables';
import { useQueryGetAllMenus } from '@hooks/api/farmhub.hook';
import { Menu } from '@models/menu';
import { Tag } from 'antd';
import clsx from 'clsx';
import { PlusIcon } from 'lucide-react';
import React from 'react';

interface MenuListProps {}

const MenuList: React.FC<MenuListProps> = () => {
    const { data, isLoading } = useQueryGetAllMenus();

    console.log('data:', data);

    return (
        <div className="flex flex-col w-full gap-10">
            <div className="flex flex-col items-end w-full gap-2 ">
                <button
                    onClick={() => {
                        // setOpenCreateModalState(!openCreateModalState);
                    }}
                    className="flex items-center gap-1 px-3 py-1 text-white duration-300 hover:text-white hover:bg-primary/90 bg-primary"
                >
                    <PlusIcon className="w-5 h-5 text-white" />
                    <span>
                        <strong>Thêm Menu</strong>
                    </span>
                </button>
            </div>

            <TableBuilder<Menu>
                rowKey="id"
                isLoading={isLoading}
                data={data?.payload || []}
                columns={[
                    {
                        title: () => <TableHeaderCell key="name" sortKey="name" label="Tên Menu" />,
                        width: 400,
                        key: 'name',
                        render: ({ ...props }: Menu) => <span>{props.name}</span>,
                    },
                    {
                        title: () => <TableHeaderCell key="tag" sortKey="tag" label="Mã Tag" />,
                        width: 400,
                        key: 'code',
                        render: ({ ...props }: Menu) => <span>{props.tag}</span>,
                    },
                    {
                        title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                        width: 400,
                        key: 'status',
                        render: ({ ...props }: Menu) => {
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
                ]}
            />
        </div>
    );
};

export default MenuList;
