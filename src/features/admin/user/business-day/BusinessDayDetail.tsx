import { TableBuilder, TableHeaderCell } from '@components/tables';
import { BusinessDay } from '@models/business-day';
import { FarmHubMenu } from '@models/farmhub-menu';
import { Descriptions, Tag } from 'antd';
import clsx from 'clsx';
interface BusinessDayDetailProps {
    value: BusinessDay;
}

const BusinessDayDetail: React.FC<BusinessDayDetailProps> = ({ value }) => {
    const menu: FarmHubMenu[] = value?.menus || [];

    return (
        <div className="flex flex-col w-full gap-4">
            <Descriptions
                labelStyle={{
                    fontWeight: 'bold',
                }}
                bordered
                title={'Station in area'}
                className="p-4 bg-white rounded-lg"
            >
                <div className="flex flex-col w-full gap-2">
                    <TableBuilder<FarmHubMenu>
                        rowKey="id"
                        isLoading={false}
                        data={menu}
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
    );
};

export default BusinessDayDetail;
