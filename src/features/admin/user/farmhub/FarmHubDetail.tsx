import { FarmHub } from '@models/user';
import { stringHelper } from '@utils/index';
import { Descriptions, Image } from 'antd';
import moment from 'moment';
import * as React from 'react';

interface StaffDetailProps {
    farmhub: FarmHub;
}

const FarmHubDetail: React.FunctionComponent<StaffDetailProps> = ({ farmhub }) => {
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
                            src={farmhub.image ? farmhub.image : stringHelper.convertTextToAvatar(farmhub.name)}
                            alt={farmhub.name}
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Address" span={3}>
                        {farmhub.address}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={1}>
                        {farmhub.status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={1}>
                        {moment(farmhub.created_at).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default FarmHubDetail;
