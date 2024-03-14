import { TableBuilder, TableHeaderCell } from '@components/tables';
import { useQueryGetFarmHubMenu } from '@hooks/api/farmhub.hook';
import { FarmHubMenu } from '@models/farmhub-menu';
import { FarmHub } from '@models/user';
import { Badge, Descriptions, Image, Tag } from 'antd';
import clsx from 'clsx';
import * as React from 'react';

interface FarmHubDetailProps {
    farmHub: FarmHub;
}

const FarmHubDetail: React.FunctionComponent<FarmHubDetailProps> = ({ farmHub }) => {
    const { data, isLoading } = useQueryGetFarmHubMenu(farmHub?.id);

    return (
        <>
            <div className="flex flex-col w-full gap-4">
                <Descriptions
                    labelStyle={{
                        fontWeight: 'bold',
                    }}
                    bordered
                    title={'Basic Information'}
                    className="p-4 bg-white rounded-lg"
                    // extra={
                    //     <Link href={`${farmHub?.id}/edit`}>
                    //         <Button>Update</Button>
                    //     </Link>
                    // }
                >
                    <Descriptions.Item label="Avatar" span={1}>
                        <Image
                            height={80}
                            width={80}
                            className="rounded overflow-hidden"
                            alt={farmHub?.name}
                            // src={farmHub?.image ? farmHub?.image : stringHelper.convertTextToAvatar(farmHub.name)}
                            src="https://farmhubagro.com.ng/wp-content/uploads/2023/05/cropped-farm-hub-logo-removebg-original.png"
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="FarmHub's name" span={3}>
                        {farmHub?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={1}>
                        {farmHub?.code}
                    </Descriptions.Item>

                    <Descriptions.Item label="Address" span={2}>
                        {farmHub?.address}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={1}>
                        <Badge status={farmHub?.status === 'Active' ? 'processing' : 'error'} text={farmHub?.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={2}>
                        {farmHub?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions
                    labelStyle={{
                        fontWeight: 'bold',
                    }}
                    bordered
                    title={'Menu'}
                    className="p-4 bg-white rounded-lg"
                >
                    <div className="flex flex-col w-full gap-2">
                        <TableBuilder<FarmHubMenu>
                            rowKey="id"
                            isLoading={isLoading}
                            data={data?.payload}
                            columns={[
                                {
                                    title: () => <TableHeaderCell key="name" sortKey="productOrigin" label="name" />,
                                    width: 400,
                                    key: 'name',
                                    render: ({ ...props }: FarmHubMenu) => <p>{props.name}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="tag" sortKey="tag" label="tag" />,
                                    width: 400,
                                    key: 'tag',
                                    render: ({ ...props }: FarmHubMenu) => <p>{props.tag}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="businessDayId" sortKey="businessDayId" label="businessDayId" />,
                                    width: 400,
                                    key: 'businessDayId',
                                    render: ({ ...props }: FarmHubMenu) => <p>{props.businessDayId}</p>,
                                },
                                {
                                    title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                                    width: 400,
                                    key: 'status',
                                    render: ({ ...props }: FarmHubMenu) => {
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
                </Descriptions>
            </div>
        </>
    );
};

export default FarmHubDetail;
