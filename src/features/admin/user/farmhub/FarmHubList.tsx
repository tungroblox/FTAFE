import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import { IV1GetFilterExpert } from '@core/api/expert.api';
// import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
import { routes } from '@core/routes';
import { useQueryCandidateFilter } from '@hooks/api/candidate.hook';
import { FarmHub, UserRole } from '@models/user';
import { stringHelper } from '@utils/index';
// import { ExpertList } from '@models/expert';
import { Image, Tag } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface FarmHubListProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const FarmHubList: React.FunctionComponent<FarmHubListProps> = ({ filter }) => {
    const { data, isLoading } = useQueryCandidateFilter(filter);
    const customers: FarmHub[] = [
        {
            id: uuidv4(),
            address: 'abc',
            description: 'abc',
            image: 'https://images.unsplash.com/photo-1706361635623-6606c945503e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Company Name',
            status: 'Active',
            created_at: new Date().toString(),
            user: {
                id: uuidv4(),
                email: 'john123@gmail.com',
                type: UserRole.FARM_HUB,
            },
        },
        {
            id: uuidv4(),
            address: 'abc',
            description: 'abc',
            image: 'https://images.unsplash.com/photo-1706361635623-6606c945503e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name: 'Company Name',
            status: 'Active',
            created_at: new Date().toString(),
            user: {
                id: uuidv4(),
                email: 'john123@gmail.com',
                type: UserRole.FARM_HUB,
            },
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

            <TableBuilder<FarmHub>
                rowKey="id"
                isLoading={isLoading}
                data={customers}
                columns={[
                    {
                        title: () => <TableHeaderCell key="avatar" sortKey="avatar" label="Avatar" />,
                        width: 400,
                        key: 'avatar',
                        render: ({ ...props }: FarmHub) => (
                            <TableBodyCell
                                label={
                                    <Image
                                        alt=""
                                        width={64}
                                        height={64}
                                        className="overflow-hidden rounded"
                                        src={props.image ? props.image : stringHelper.convertTextToAvatar(props.name)}
                                    />
                                }
                            />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="fullName" sortKey="fullName" label="Company Name" />,
                        width: 400,
                        key: 'fullName',
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
                            return <TableBodyCell label={<Link href={routes.admin.user.farm_hub.detail(props.id)}>View detail</Link>} />;
                        },
                    },
                ]}
            />
        </div>
    );
};

export default FarmHubList;
