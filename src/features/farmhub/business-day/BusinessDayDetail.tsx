import { TableBuilder, TableHeaderCell } from '@components/tables';
import { BusinessDay } from '@models/business-day';
import { FarmHubMenu } from '@models/farmhub-menu';
import { Descriptions, Tag } from 'antd';
import clsx from 'clsx';
import moment from 'moment';
interface BusinessDayDetailProps {
    value?: BusinessDay;
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
                className="p-4 text-3xl bg-white rounded-lg [&>div>div]:!text-2xl"
            >
                <div className="flex flex-col w-full gap-2">
                    <TableBuilder<FarmHubMenu>
                        rowKey="id"
                        isLoading={false}
                        data={menu}
                        columns={[
                            {
                                title: () => <TableHeaderCell key="name" sortKey="name" label="Menu" />,
                                width: 400,
                                key: 'name',
                                render: ({ ...props }: FarmHubMenu) => <p>{props.name}</p>,
                            },
                            {
                                title: () => <TableHeaderCell key="productOrigin" sortKey="productOrigin" label="Nơi sản xuất" />,
                                width: 400,
                                key: 'name',
                                render: ({ ...props }: FarmHubMenu) => <p>{props.name}</p>,
                            },
                            {
                                title: () => <TableHeaderCell key="tag" sortKey="tag" label="Mã tag" />,
                                width: 400,
                                key: 'tag',
                                render: ({ ...props }: FarmHubMenu) => <p>{props.tag}</p>,
                            },
                            {
                                title: () => <TableHeaderCell key="createdAt" sortKey="createdAt" label="Ngày tạo" />,
                                width: 400,
                                key: 'createdAt',
                                render: ({ ...props }: FarmHubMenu) => <p>{moment(props.createdAt).format('DD/MM/YYYY')}</p>,
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
