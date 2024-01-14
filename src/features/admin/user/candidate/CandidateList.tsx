import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import { IV1GetFilterExpert } from '@core/api/expert.api';
// import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
import { routes } from '@core/routes';
import { useQueryCandidateFilter } from '@hooks/api/candidate.hook';
import { CandidateItem } from '@models/candidate';
import { stringHelper } from '@utils/index';
// import { ExpertList } from '@models/expert';
import { Image } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

interface CandidateListProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const CandidateList: React.FunctionComponent<CandidateListProps> = ({ filter }) => {
    const { data, isLoading } = useQueryCandidateFilter(filter);

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

            <TableBuilder<CandidateItem>
                rowKey="id"
                isLoading={isLoading}
                data={data}
                columns={[
                    {
                        title: () => <TableHeaderCell key="avatar" sortKey="avatar" label="Avatar" />,
                        width: 400,
                        key: 'avatar',
                        render: ({ ...props }: CandidateItem) => (
                            <TableBodyCell
                                label={
                                    <Image
                                        width={64}
                                        height={64}
                                        className="rounded overflow-hidden"
                                        src={props.user.avatar ? props.user.avatar : stringHelper.convertTextToAvatar(props.user.fullName)}
                                    />
                                }
                            />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="fullName" sortKey="fullName" label="Fullname" />,
                        width: 400,
                        key: 'fullName',
                        render: ({ ...props }: CandidateItem) => (
                            <TableBodyCell label={<Link href={routes.admin.user.expert.detail(props.id)}>{props.user.fullName}</Link>} />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="email" sortKey="email" label="Email" />,
                        width: 400,
                        key: 'email',
                        render: ({ ...props }: CandidateItem) => <TableBodyCell label={props.user.email} />,
                    },

                    {
                        title: () => <TableHeaderCell key="" sortKey="" label="" />,
                        width: 400,
                        key: 'action',
                        render: ({ ...props }) => {
                            return <TableBodyCell label={<Link href={routes.admin.user.candidate.detail(props.id)}>View detail</Link>} />;
                        },
                    },
                ]}
            />
        </div>
    );
};

export default CandidateList;
