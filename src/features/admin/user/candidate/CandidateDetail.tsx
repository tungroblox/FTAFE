import { CandidateItem } from '@models/candidate';
import { convertTextToAvatar } from '@utils/string.helper';
import { Descriptions, Image } from 'antd';
import moment from 'moment';
import * as React from 'react';

interface StaffDetailProps {
    candidate: CandidateItem;
}

const CandidateDetail: React.FunctionComponent<StaffDetailProps> = ({ candidate }) => {
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
                            src={candidate.user.avatar ? candidate.user.avatar : convertTextToAvatar(candidate.user.fullName)}
                            alt={candidate.user.fullName}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Fullname" span={2}>
                        {candidate.user.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={1}>
                        {candidate.user.status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={1}>
                        {moment(candidate.user.createdAt).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Updated At" span={1}>
                        {moment(candidate.user.updatedAt).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default CandidateDetail;
