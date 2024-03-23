import { DashOutlined } from '@ant-design/icons';
import { TextInput } from '@components/forms';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { TableBodyCell, TableBuilder, TableHeaderCell } from '@components/tables';
import { CustomerAPI } from '@core/api/customer.api';
import { IV1GetFilterExpert } from '@core/api/expert.api';
import { Customer, CustomerFilter } from '@models/customer';
import { useQuery } from '@tanstack/react-query';
import { convertTextToAvatar } from '@utils/string.helper';
import { Button, Dropdown, Image, Menu } from 'antd';
// import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
// import { ExpertList } from '@models/expert';
import * as React from 'react';
import { toast } from 'react-toastify';

interface CustomerListProps {
    filter: Partial<CustomerFilter>;
}

const CustomerList: React.FunctionComponent<CustomerListProps> = ({ filter }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['customers', filter],
        queryFn: async () => {
            const res = await CustomerAPI.getAll(filter);
            return res;
        },
    });
    const listCustomer = data?.payload || [];
    return (
        <div className="flex flex-col w-full gap-2">
            <FormFilterWrapper<IV1GetFilterExpert> defaultValues={{ ...filter }}>
                <div className="w-56">
                    <TextInput name="firstName" label="First Name" />
                </div>
                <div className="w-56">
                    <TextInput name="lastName" label="Last Name" />
                </div>
                <div className="w-56">
                    <TextInput name="email" label="Email" />
                </div>
                <div className="w-56">
                    <TextInput name="phoneNumber" label="Phone" />
                </div>
            </FormFilterWrapper>
            <TableBuilder<Customer>
                rowKey="id"
                isLoading={isLoading}
                data={listCustomer}
                columns={[
                    {
                        title: () => <TableHeaderCell key="image" sortKey="image" label="image" />,
                        width: 400,
                        key: 'image',
                        render: ({ ...props }: Customer) => (
                            <TableBodyCell
                                label={
                                    <Image
                                        alt=""
                                        width={64}
                                        height={64}
                                        className="overflow-hidden rounded"
                                        src={props.avatar ? props.avatar : convertTextToAvatar(props.firstName)}
                                    />
                                }
                            />
                        ),
                    },
                    {
                        title: () => <TableHeaderCell key="firstName" sortKey="firstName" label="First Name" />,
                        width: 400,
                        key: 'firstName',
                        render: ({ ...props }: Customer) => <p>{props.firstName}</p>,
                    },
                    {
                        title: () => <TableHeaderCell key="lastName" sortKey="lastName" label="Last Name" />,
                        width: 400,
                        key: 'lastName',
                        render: ({ ...props }: Customer) => <p>{props.lastName}</p>,
                    },
                    {
                        title: () => <TableHeaderCell key="email" sortKey="email" label="Email" />,
                        width: 400,
                        key: 'email',
                        render: ({ ...props }: Customer) => <p>{props.email}</p>,
                    },
                    {
                        title: () => <TableHeaderCell key="phoneNumber" sortKey="phoneNumber" label="Phone" />,
                        width: 400,
                        key: 'phoneNumber',
                        render: ({ ...props }: Customer) => <p>{props.phoneNumber}</p>,
                    },
                    // {
                    //     title: () => <TableHeaderCell key="status" sortKey="status" label="Status" />,
                    //     width: 400,
                    //     key: 'status',
                    //     render: ({ ...props }: FarmHub) => {
                    //         return (
                    //             <Tag
                    //                 className={clsx(`text-sm whitespace-normal`)}
                    //                 color={typeof props.status === 'string' && props.status === 'Active' ? 'geekblue' : 'volcano'}
                    //             >
                    //                 {props.status}
                    //             </Tag>
                    //         );
                    //     },
                    // },
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
                                                <Button
                                                    onClick={() => {
                                                        toast.warn('chưa có api');
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </Menu.Item>

                                            <Menu.Item key="2">
                                                <Button
                                                    onClick={() => {
                                                        toast.warn('chưa có api');
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                    trigger={['click']}
                                >
                                    <DashOutlined />
                                </Dropdown>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
};

export default CustomerList;
