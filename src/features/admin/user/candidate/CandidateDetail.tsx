import { Customer } from '@models/candidate';
import { convertTextToAvatar } from '@utils/string.helper';
import { Descriptions, Image } from 'antd';
import moment from 'moment';
import * as React from 'react';

interface StaffDetailProps {
    candidate: Customer;
}

const CandidateDetail: React.FunctionComponent<StaffDetailProps> = ({ candidate }) => {
    console.log('candidate:', candidate);
    console.log('-------------');
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
                            className="rounded overflow-hidden"
                            src={candidate.avatar ? candidate.avatar : convertTextToAvatar(candidate.fullName)}
                            alt={candidate.fullName}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Fullname" span={2}>
                        {candidate.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Username" span={1}>
                        {candidate.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender" span={1}>
                        {candidate.gender}
                    </Descriptions.Item>
                    <Descriptions.Item label="Job" span={2}>
                        {candidate.job_title}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>
                        {candidate.address}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={1}>
                        {candidate.status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={1}>
                        {moment(candidate.createdAt).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Updated At" span={1}>
                        {moment(candidate.updatedAt).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default CandidateDetail;
