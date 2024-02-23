import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import { IV1GetFilterExpert } from '@core/api/expert.api';
// import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
import { routes } from '@core/routes';
import { useQueryFarmHub } from '@hooks/api/farmhub.hook';
import { FarmHub } from '@models/user';
// import { ExpertList } from '@models/expert';
import { Image, Tag } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

interface FarmHubListProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const FarmHubList: React.FunctionComponent<FarmHubListProps> = ({ filter }) => {
    const { data, isLoading } = useQueryFarmHub();

    const farmHub: FarmHub[] = data?.payload;

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
                                        // src={props.image ? props.image : stringHelper.convertTextToAvatar(props.name)}
                                        src={'https://farmhubagro.com.ng/wp-content/uploads/2023/05/cropped-farm-hub-logo-removebg-original.png'}
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
                        // sorter: (a, b) => {
                        //     return a.name.localeCompare(b.name);
                        // },
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
                            return <TableBodyCell label={<Link href={routes.admin.user.farm_hub.detail(props.id)}>View detail</Link>} />;
                        },
                    },
                ]}
            />
        </div>
    );
};

export default FarmHubList;
