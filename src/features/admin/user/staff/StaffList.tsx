import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableActionCell, TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { useTableUtil } from '@context/tableUtilContext';
import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
import { IV1GetFilterStaff } from '@core/api/staff.api';
import { routes } from '@core/routes';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQueryStaffFilter } from '@hooks/api/staff.hook';
import { UserItem } from '@models/user';
// import { ExpertList } from '@models/expert';
import { useQuery } from '@tanstack/react-query';
import { stringHelper } from '@utils/index';
import { Image, Tag } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

interface StaffListProps {
    filter: Partial<IV1GetFilterStaff>;
}

const StaffList: React.FunctionComponent<StaffListProps> = ({ filter }) => {
    const router = useRouter();

    const { data, isLoading } = useQueryStaffFilter(filter);

    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col items-end w-full gap-2 ">
                <button
                    onClick={() => router.push(routes.admin.user.staff.create())}
                    className="flex items-center gap-1 px-3 py-1 text-white duration-300 hover:text-white hover:bg-primary/90 bg-primary"
                >
                    <PlusIcon className="w-5 h-5 text-white" />
                    <span>Create New Staff</span>
                </button>
            </div>

            <FormFilterWrapper<IV1GetFilterExpert> defaultValues={{ ...filter }}>
                <div className="w-56">
                    <TextInput name="name" label="Name" />
                </div>
                <div className="w-56">
                    <TextInput name="phone" label="Phone" />
                </div>
                <div className="w-56">
                    <TextInput name="email" label="Email" />
                </div>
            </FormFilterWrapper>

            <TableBuilder<UserItem>
                rowKey="id"
                isLoading={isLoading}
                data={data}
                columns={[
                    {
                        title: () => <TableHeaderCell key="avatar" sortKey="avatar" label="Avatar" />,
                        width: 400,
                        key: 'avatar',
                        render: ({ ...props }: UserItem) => (
                            <TableBodyCell
                                label={
                                    <Image
                                        width={64}
                                        height={64}
                                        className="rounded overflow-hidden"
                                        src={props.avatar ? props.avatar : stringHelper.convertTextToAvatar(props.fullName)}
                                    />
                                }
                            />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="fullName" sortKey="fullName" label="Fullname" />,
                        width: 400,
                        key: 'fullName',
                        render: ({ ...props }: UserItem) => (
                            <TableBodyCell
                                label={
                                    <Link href={routes.admin.user.staff.detail(props.id)}>
                                        <span className="text-primary cursor-pointer">{props.fullName}</span>
                                    </Link>
                                }
                            />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="email" sortKey="email" label="Email" />,
                        width: 400,
                        key: 'email',
                        render: ({ ...props }: UserItem) => <TableBodyCell label={props.email} />,
                    },
                    {
                        title: () => <TableHeaderCell key="phone" sortKey="phone" label="Phone" />,
                        width: 400,
                        key: 'phone',
                        render: ({ ...props }: UserItem) => <TableBodyCell label={props.phone} />,
                    },
                ]}
            />
        </div>
    );
};

export default StaffList;
