import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import { IV1GetFilterExpert } from '@core/api/expert.api';
// import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
import { routes } from '@core/routes';
import { useQueryCandidateFilter } from '@hooks/api/candidate.hook';
import { Customer } from '@models/candidate';
import { UserRole } from '@models/user';
import { stringHelper } from '@utils/index';
// import { ExpertList } from '@models/expert';
import { Image, Tag } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

interface CandidateListProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const CandidateList: React.FunctionComponent<CandidateListProps> = ({ filter }) => {
    const { data, isLoading } = useQueryCandidateFilter(filter);
    const customers: Customer[] = [
        {
            id: '1',
            type: UserRole.CUSTOMER,
            avatar: 'https://images.unsplash.com/photo-1706361635623-6606c945503e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            email: 'user@example.com',
            fullName: 'John Doe',
            phone: '123456789',
            status: 'active',
            createdAt: '',
            updatedAt: '',
            isDeleted: false,
            address: 'lorem ...',
            gender: 'male',
            username: 'john123',
            password: '123456789',
            job_title: ' lorem',
        },
        {
            id: '2',
            type: UserRole.CUSTOMER,
            avatar: 'https://images.unsplash.com/photo-1706361635623-6606c945503e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            email: 'user@example.com',
            fullName: 'John Doe',
            phone: '123456789',
            status: 'inactive',
            createdAt: '',
            updatedAt: '',
            isDeleted: false,
            address: 'lorem ...',
            gender: 'male',
            username: 'john123',
            password: '123456789',
            job_title: ' lorem',
        },
        // Add more customer objects as needed
    ];

    return (
        <div className="flex flex-col w-full gap-2">
            <FormFilterWrapper<IV1GetFilterExpert> defaultValues={{ ...filter }}>
                <div className="w-56">
                    <TextInput name="name" label="Name" />
                </div>
                <div className="w-56">
                    <TextInput name="email" label="Email" />
                </div>
            </FormFilterWrapper>

            <TableBuilder<Customer>
                rowKey="id"
                isLoading={isLoading}
                data={customers}
                columns={[
                    {
                        title: () => <TableHeaderCell key="avatar" sortKey="avatar" label="Avatar" />,
                        width: 400,
                        key: 'avatar',
                        render: ({ ...props }: Customer) => (
                            <TableBodyCell
                                label={
                                    <Image
                                        alt=""
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
                        render: ({ ...props }: Customer) => (
                            <TableBodyCell label={<Link href={routes.admin.user.customer.detail(props.id)}>{props.fullName}</Link>} />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="email" sortKey="email" label="Email" />,
                        width: 400,
                        key: 'email',
                        render: ({ ...props }: Customer) => <TableBodyCell label={props.email} />,
                    },
                    {
                        title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                        width: 400,
                        key: 'status',
                        render: ({ ...props }: Customer) => {
                            // return <TableBodyCell label={props.user.status} />;
                            return (
                                <Tag className={clsx(`text-sm whitespace-normal`)} color={props.status === 'active' ? 'geekblue' : 'volcano'}>
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
                            console.log(props.id);
                            return <TableBodyCell label={<Link href={routes.admin.user.customer.detail(props.id)}>View detail</Link>} />;
                        },
                    },
                ]}
            />
        </div>
    );
};

export default CandidateList;
