import { FarmHub } from '@models/user';
import { Descriptions, Image } from 'antd';
import * as React from 'react';

interface FarmHubDetailProps {
    farmHub: FarmHub;
}

const ProductDetail: React.FunctionComponent<FarmHubDetailProps> = ({ farmHub }) => {
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
                            alt={farmHub?.name}
                            // src={farmHub?.image ? farmHub?.image : stringHelper.convertTextToAvatar(farmHub.name)}
                            src="https://farmhubagro.com.ng/wp-content/uploads/2023/05/cropped-farm-hub-logo-removebg-original.png"
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Address" span={3}>
                        {farmHub?.address}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={1}>
                        {farmHub?.status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={1}>
                        {farmHub?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default ProductDetail;
