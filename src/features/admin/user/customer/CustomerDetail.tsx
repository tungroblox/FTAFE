import { Customer } from '@models/candidate';
import { convertTextToAvatar } from '@utils/string.helper';
import { Descriptions, Image } from 'antd';
import moment from 'moment';
import * as React from 'react';

interface StaffDetailProps {
    customer: Customer;
}

const CustomerDetail: React.FunctionComponent<StaffDetailProps> = ({ customer }) => {
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
                >
                    <Descriptions.Item label="Avatar" span={1}>
                        <Image
                            height={80}
                            width={80}
                            className="overflow-hidden rounded"
                            src={customer.user.avatar ? customer.user.avatar : convertTextToAvatar(customer.user.fullName)}
                            alt={customer.user.fullName}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Fullname" span={2}>
                        {customer.user.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Username" span={1}>
                        {customer.user.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender" span={1}>
                        {customer.user.gender}
                    </Descriptions.Item>
                    <Descriptions.Item label="Job" span={2}>
                        {customer.user.job_title}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>
                        {customer.user.address}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={1}>
                        {customer.user.status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={1}>
                        {moment(customer.user.createdAt).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Updated At" span={1}>
                        {moment(customer.user.updatedAt).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default CustomerDetail;
